import { IimageTask } from "./IimageTask";


export interface IhadlerRepo{


    imageTaskFinder(requestId:string):Promise<IimageTask | null>

    findImageTaskStatus(requestId:string):Promise<IimageTask>
    

}