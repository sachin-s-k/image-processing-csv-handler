

export interface IhandlerInteractor{

     csvHandler(filePath:string,webhookUrl:string):string

     getImageTaskStatus(requestId:string):string


}