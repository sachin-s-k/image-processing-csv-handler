import { Request, Response } from "express"
import { IhandlerInteractor } from "../interfaces/IhandlerInteractor"
import { v4 as uuidv4 } from 'uuid'
  

export class HandlerController{
    
      private  handlerInteractor:IhandlerInteractor

      constructor(handlerInteractor:IhandlerInteractor){
        this.handlerInteractor=handlerInteractor
      }

     async OnUploadImage(req:Request,res:Response){

     
    try{
        const webhookUrl=req.body.webhookUrl

        const {requestId}= await this.handlerInteractor.csvHandler((req as any).file,webhookUrl)

        res.json(requestId)
    }catch(error:any){
        res.status(error.message)
    }

   

         
       

   





     }

     async OnFindTaskStatus(req:Request,res:Response){

        const {requestId}=req.params
        const response= await this.handlerInteractor.getImageTaskStatus(requestId)
        res.json(response)


     }

  }