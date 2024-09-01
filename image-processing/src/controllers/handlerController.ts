import { Request, Response } from "express";
import { IhandlerInteractor } from "../interfaces/IhandlerInteractor";
import { IimageTask } from "../interfaces/IimageTask";

export class HandlerController {
  private handlerInteractor: IhandlerInteractor;

  constructor(handlerInteractor: IhandlerInteractor) {
    this.handlerInteractor = handlerInteractor;
  }

  async OnUploadImage(req: Request, res: Response) {
    try {
      // check if there was a file validation error
      if ((req as any).fileValidationError) {
        return res
          .status(400)
          .send({ message: (req as any).fileValidationError });
      }

      // if no file is uploaded
      if (!req.file) {
        return res.status(400).send({ message: "Please upload a CSV file !" });
      }
      const { webhookUrl } = req.body;

      const requestId = await this.handlerInteractor.csvHandler(
        (req as any).file.path,
        webhookUrl
      );
      return res.json({
        requestId,
        message:
          "You can track the status of your request using the provided Request Id",
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async OnFindTaskStatus(req: Request, res: Response) {
    try {
      const { requestId } = req.params;
      const imageTask: IimageTask | null =
        await this.handlerInteractor.getImageTaskStatus(requestId);
      return res.json({ requestStatus: imageTask?.status });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
