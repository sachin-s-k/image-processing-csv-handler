import { ImageTask } from "../entities/imageTaskEntity";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";
import { IimageTask } from "../interfaces/IimageTask";



export class HandlerRepo implements IhadlerRepo{


    async imageTaskFinder(requestId: string): Promise<IimageTask | null> {


        const image=await ImageTask.findOne({requestId})

        return image
        
    }
    

}
