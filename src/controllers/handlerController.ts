import { Request, Response } from "express"
import { IhandlerInteractor } from "../interfaces/IhandlerInteractor"

  

export class HandlerController{
    
      private  handlerInteractor:IhandlerInteractor

      constructor(handlerInteractor:IhandlerInteractor){
        this.handlerInteractor=handlerInteractor
      }

     OnUploadImage(req:Request,res:Response){

        




     }

  }