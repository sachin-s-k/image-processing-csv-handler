import { Iimage } from "./Iimage"
import { Document } from "mongoose"

export interface IimageTask extends Document{

    requestId:string,
    status:string,
    images:Array<Iimage>
    webhookUrl:string

}