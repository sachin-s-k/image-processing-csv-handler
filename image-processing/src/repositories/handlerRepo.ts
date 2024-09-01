import { ImageTask } from "../entities/imageTaskEntity";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";
import { Iimage } from "../interfaces/Iimage";
import { IimageTask } from "../interfaces/IimageTask";



export class HandlerRepo implements IhadlerRepo{

 async imageTaskRequest(requestId: string, images: Array<Iimage>, webhookUrl: string): Promise<string> {
    const res=await ImageTask.create({requestId,images,webhookUrl,status:'processing'})
        
     return res.requestId
 }


  async  findImageTaskStatus(requestId: string): Promise<IimageTask|null> {

        const imageTask:IimageTask|null=await ImageTask.findOne({requestId})
        if(!imageTask){
            throw new Error(`Image processing with requestId ${requestId} not found.`);
        }

        return imageTask
        
    }

   async  updateImageTask(requestId:string,index:number,outPutUrls:Array<string>):Promise<IimageTask |null>{

    
        const res=await ImageTask.findOneAndUpdate({requestId},{$set:{[`images.${index}.outputUrls`]:outPutUrls}},{new:true,runValidators:true})
        
        return res
    }

    async imageTasKStausUpdate(requestId:string):Promise<IimageTask|null>{

        const imageTask=await ImageTask.findOneAndUpdate({requestId},{status:"completed"},{new:true,runValidators:true})

        return imageTask

    }
       
   


}
