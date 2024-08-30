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


   async csvHandler(filePath:string,webhookUrl:string):Promise<any>{


    const requestId= uuidv4()
    const images:any=[]
  
console.log(filePath,'filee');

     fs.createReadStream(filePath).pipe(csvParser()).on('data',async (row)=>{
         console.log(row,'<===>');
        
           
        const {'S. No':serilaNumber,'Product Name':productName,'Input Image Urls':inputUrls}=row
        if(!serilaNumber ||!productName||!inputUrls){
            throw new Error('Invalid CSV format')
        }

        const urls:Array<string>=inputUrls.split(',').map((url:string)=>url.trim())

           images.push({productName,inputUrls:urls,outputUrls:[]})
          
     }).on('end',async ()=>{
        fs.unlinkSync(filePath)
        this.processImages(requestId)
        return this.handlerRepo.imageTaskFinder(requestId,images,webhookUrl)

     })
       
        
    }

   async  processImages(requestId:string){

        const imageTask=await this.handlerRepo.findTaskStatus(requestId)
        let  outPutUrls:Array<string>=[]
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
                  
                }catch(error:any){
                    throw new Error(`Failed to process image: ${error.message}`);

                }
            }
        }

        return    this.handlerRepo.updateImageTaskFinder(requestId,outPutUrls)

    }
  getImageTaskStatus(requestId: string): any{

    return this.handlerRepo.findTaskStatus(requestId)
       

  }



}