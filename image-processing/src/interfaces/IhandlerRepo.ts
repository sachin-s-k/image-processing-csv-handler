import { Iimage } from "./Iimage";
import { IimageTask } from "./IimageTask";


export interface IhadlerRepo{


    imageTaskFinder(requestId:string,images:Array<Iimage>,webhookUrl:string):Promise<string>
    findTaskStatus(requestId:string):Promise<IimageTask|null>
    updateImageTaskFinder(requestId:string,string:number,outPutUrls:Array<string>):any
    imageTasKStausUpdate(requestId:string):Promise<IimageTask|null>

}