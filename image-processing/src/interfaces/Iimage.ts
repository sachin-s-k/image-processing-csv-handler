import { Document } from "mongoose"

export interface Iimage extends Document{

    productName:string,
    inputUrls:Array<string>
    outputUrls:Array<string>
}