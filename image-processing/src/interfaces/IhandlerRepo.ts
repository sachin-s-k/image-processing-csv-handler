import { Iimage } from "./Iimage";
import { IimageTask } from "./IimageTask";


export interface IhadlerRepo{


    imageTaskRequest(requestId:string,images:Array<Iimage>,webhookUrl:string):Promise<string>
    findImageTaskStatus(requestId:string):Promise<IimageTask|null>
    updateImageTask(requestId:string,string:number,outPutUrls:Array<string>):any
    imageTasKStausUpdate(requestId:string):Promise<IimageTask|null>

}