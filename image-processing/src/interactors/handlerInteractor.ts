import { IhandlerInteractor } from "../interfaces/IhandlerInteractor";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";
import csvParser from "csv-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import axios from "axios";
import sharp from "sharp";
import { IimageTask } from "../interfaces/IimageTask";

export class HandlerInteractor implements IhandlerInteractor {
  private handlerRepo: IhadlerRepo;

  constructor(handlerRepo: IhadlerRepo) {
    this.handlerRepo = handlerRepo;
  }

  async csvHandler(filePath: string, webhookUrl: string): Promise<string> {
    const requestId = uuidv4();
    const images: any = [];

    try {
      // Read the CSV file and populate the images array
      await new Promise<void>((resolve, reject) => {
        const readStream = fs.createReadStream(filePath).pipe(csvParser());

        readStream
          .on("data", (row) => {
            const {
              "S. No": serialNumber,
              "Product Name": productName,
              "Input Image Urls": inputUrls,
            } = row;
            if (!serialNumber || !productName || !inputUrls) {
              console.log("error");
              readStream.destroy(); // Stop reading the stream
              reject(new Error("Invalid CSV format"));
            }

            const urls: Array<string> = inputUrls
              ?.split(",")
              .map((url: string) => url.trim());
            images.push({ productName, inputUrls: urls, outputUrls: [] });
          })
          .on("end", () => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath); // Clean up uploaded file
              resolve();
            }
          })
          .on("error", (err) => {
            reject(err);
          });
      });

      //  return requestId after CSV validation
      await this.handlerRepo.imageTaskRequest(requestId, images, webhookUrl);

      // asynchronously process images
      this.processImages(requestId)
        .then((imageTask) => {
          this.triggerWebhook(imageTask);
        })
        .catch((err) => {
          console.error("Error processing images:", err.message);
        });

      return requestId;
    } catch (error: any) {
      // clean up the file in case of an error
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      // Send error back to the client
      throw new Error(`Failed to process CSV: ${error.message}`);
    }
  }

  // image processor

  async processImages(requestId: string): Promise<any> {
    console.log("process image called");

    const imageTask: IimageTask | null =
      await this.handlerRepo.findImageTaskStatus(requestId);

    if (!imageTask) return null;
    for (let i = 0; i < imageTask.images.length; i++) {
      let outPutUrls: Array<string> = [];
      for (let j = 0; j < imageTask.images[i].inputUrls.length; j++) {
        try {
          //To download the image
          const response = await axios.get(imageTask.images[i].inputUrls[j], {
            responseType: "arraybuffer",
          });
          const inputBuffer = Buffer.from(response.data, "binary");
          //compress the image by 50%
          const ouputBuffer = await sharp(inputBuffer)
            .jpeg({ quality: 50 })
            .toBuffer();

          const outPutUrl = `https://example.com/compressed/${uuidv4()}.jpg`;
          outPutUrls.push(outPutUrl);
        } catch (error: any) {
          throw new Error(`Failed to process image: ${error.message}`);
        }
      }
      await this.handlerRepo.updateImageTask(requestId, i, outPutUrls);
    }

    return this.handlerRepo.imageTasKStausUpdate(requestId);
  }
  // find the status of the each request
  getImageTaskStatus(requestId: string): any {
    return this.handlerRepo.findImageTaskStatus(requestId);
  }

  //for triggering webhooks
  async triggerWebhook(imageTask: IimageTask): Promise<void> {
    try {
      if (imageTask.webhookUrl) {
        console.log("axios ====");

        await axios.post(imageTask?.webhookUrl, {
          requestId: imageTask.requestId,
          status: imageTask.status,
          message: "Image processing completed",
        });
        console.log("webhook trigeered sucessfully");
      } else {
        return;
      }
    } catch (error) {
      console.log("axios erroroororoor ====");
      console.log(error);
    }
  }
}
