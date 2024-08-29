import express from 'express'
import { upload } from '../infrastructure/middlewares/upload'




const handlerRoutes= express.Router()


  handlerRoutes.post('/upload',upload.single('file'),)


export default handlerRoutes