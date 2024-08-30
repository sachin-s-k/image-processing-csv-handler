import { ImageTask } from "../entities/imageTaskEntity";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";
import { Iimage } from "../interfaces/Iimage";
import { IimageTask } from "../interfaces/IimageTask";



export class HandlerRepo implements IhadlerRepo{

 async imageTaskFinder(requestId: string, images: Array<Iimage>, webhookUrl: string): Promise<string> {
    const res=await ImageTask.create({requestId,images,webhookUrl,status:'processing'})
        
 
     return res.requestId
 }


  async  findTaskStatus(requestId: string): Promise<IimageTask|null> {

        const image:IimageTask|null=await ImageTask.findOne({requestId})

        return image
        
    }

   async  updateImageTaskFinder(requestId:string,outPutUrls:Array<string>){
        const res=await ImageTask.findOneAndUpdate({requestId},{$set:{'images.$[].outputUrls':outPutUrls}},{new:true,runValidators:true})
console.log(res,'res')

        //return res
    }
       
   


}
