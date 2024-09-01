import express, { NextFunction, Request, Response } from 'express'
import { upload } from '../infrastructure/middlewares/upload'
import { HandlerController } from '../controllers/handlerController'
import { HandlerInteractor } from '../interactors/handlerInteractor'
import { HandlerRepo } from '../repositories/handlerRepo'
import multer from 'multer'
const handlerRepo=new HandlerRepo()
const handlerInteractor=new HandlerInteractor(handlerRepo)
const handlerController=new HandlerController(handlerInteractor)

const handlerRoutes= express.Router()


   handlerRoutes.post('/upload',upload.single('file'),handlerController.OnUploadImage.bind(handlerController))
   handlerRoutes.get('/status/:requestId',handlerController.OnFindTaskStatus.bind(handlerController))
   
   handlerRoutes.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ error: err.message });
      } else if (err) {
        res.status(400).json({ error: err.message });
      }
    })

export default handlerRoutes