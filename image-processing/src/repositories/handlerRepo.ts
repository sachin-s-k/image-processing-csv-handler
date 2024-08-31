import { ImageTask } from "../entities/imageTaskEntity";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";
import { Iimage } from "../interfaces/Iimage";
import { IimageTask } from "../interfaces/IimageTask";



export class HandlerRepo implements IhadlerRepo{

 async imageTaskFinder(requestId: string, images: Array<Iimage>, webhookUrl: string): Promise<string> {
    const res=await ImageTask.create({requestId,images,webhookUrl,status:'processing'})
        
      console.log(res,'res');
      
     return res.requestId
 }


  async  findTaskStatus(requestId: string): Promise<IimageTask|null> {

        const imageTask:IimageTask|null=await ImageTask.findOne({requestId})

           return imageTask
        
    }

   async  updateImageTaskFinder(requestId:string,index:number,outPutUrls:Array<string>):Promise<IimageTask |null>{
    console.log('update');
    
        const res=await ImageTask.findOneAndUpdate({requestId},{$set:{[`images.${index}.outputUrls`]:outPutUrls}},{new:true,runValidators:true})
        console.log('update res' ,res);
        
        return res
    }

    async imageTasKStausUpdate(requestId:string):Promise<IimageTask|null>{

        const imageTask=await ImageTask.findOneAndUpdate({requestId},{status:"completed"},{new:true,runValidators:true})

        return imageTask

    }
       
   


}
