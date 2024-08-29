import { IhandlerInteractor } from "../interfaces/IhandlerInteractor";
import { IhadlerRepo } from "../interfaces/IhandlerRepo";


export class HandlerInteractor implements IhandlerInteractor{

    private handlerRepo:IhadlerRepo

    constructor(handlerRepo:IhadlerRepo){
        this.handlerRepo=handlerRepo
    }






}