import { Request, Response } from "express"
import { IhandlerInteractor } from "../interfaces/IhandlerInteractor"
import { v4 as uuidv4 } from 'uuid'
import { Iimage } from "../interfaces/Iimage"
import { IimageTask } from "../interfaces/IimageTask"
  

export class HandlerController{
    
      private  handlerInteractor:IhandlerInteractor

      constructor(handlerInteractor:IhandlerInteractor){
        this.handlerInteractor=handlerInteractor
      }

     async OnUploadImage(req:Request,res:Response){

     console.log('controller');
     
    try{
        const webhookUrl=req.body.webhookUrl

        const requestId= await this.handlerInteractor.csvHandler((req as any).file.path,webhookUrl)
        console.log(requestId,'reqq');
        
       return  res.json({requestId})
    }catch(error:any){
        return res.status(error.message)
    }

     }

     async OnFindTaskStatus(req:Request,res:Response){

        const {requestId}=req.params
        const imageTask:IimageTask|null= await this.handlerInteractor.getImageTaskStatus(requestId)
        return res.json({requestStatus:imageTask?.status})


     }

  }