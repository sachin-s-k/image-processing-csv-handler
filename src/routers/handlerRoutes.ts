import express from 'express'
import { upload } from '../infrastructure/middlewares/upload'
import { HandlerController } from '../controllers/handlerController'
import { HandlerInteractor } from '../interactors/handlerInteractor'
import { HandlerRepo } from '../repositories/handlerRepo'

const handlerRepo=new HandlerRepo()
const handlerInteractor=new HandlerInteractor(handlerRepo)
const handlerController=new HandlerController(handlerInteractor)

const handlerRoutes= express.Router()


   handlerRoutes.post('/upload',upload.single('file'),handlerController.OnUploadImage.bind(handlerController))
   handlerRoutes.get('/status/:requestId',handlerController.OnFindTaskStatus.bind(handlerController))

export default handlerRoutes