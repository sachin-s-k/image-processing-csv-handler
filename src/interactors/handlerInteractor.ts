import { IhandlerInteractor } from "../interfaces/IhandlerInteractor";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";
import csvParser from "csv-parser";
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import axios from "axios";
import sharp from "sharp";
export class HandlerInteractor implements IhandlerInteractor{

    private handlerRepo:IhadlerRepo

    constructor(handlerRepo:IhadlerRepo){
        this.handlerRepo=handlerRepo
    }


   async  csvHandler(filePath,webhookUrl) {


    const requestId= uuidv4()
    

     fs.createReadStream(filePath).pipe(csvParser()).on('data',async (row)=>{

        const {'S.No':serilaNumber,'Product Name':productName,'Input Image Urls':inputUrls}=row
        if(!serilaNumber ||!productName||!inputUrls){
            throw new Error('Invalid CSV format')
        }

        const urls=inputUrls.split(',').map((url:string)=>url.trim())
          

     }).on('end',async ()=>{
        fs.unlinkSync(filePath)
        this.processImages(requestId)
       return requestId

     })
       
        
    }

   async  processImages(requestId:string){

        const imageTask=await this.handlerRepo.imageTaskFinder(requestId)
        const outPutUrls:Array<string>=[]
        if(!imageTask) return 
        for(let image of imageTask.images){
            for(let url of image.inputUrls){
                try{
                
                    // To download the image
                    const response= await axios.get(url,{responseType:'arraybuffer'})
                    const inputBuffer=Buffer.from(response.data,'binary')
                    //compress the image by 50%

                    const ouputBuffer=await sharp(inputBuffer).jpeg({quality:50}).toBuffer()

                    const outPutUrl=`https://example.com/compressed/${uuidv4()}.jpg`
                     outPutUrls.push(outPutUrl)
                    return outPutUrl
                }catch(error:any){
                    throw new Error(`Failed to process image: ${error.message}`);

                }
            }
        }

        return outPutUrls

    }
    getImageTaskStatus(requestId: string): string {

        return this.handlerRepo.findImageTaskStatus(requestId)


        
    }



}