import { IimageTask } from "./IimageTask";

export interface IhandlerInteractor {
  csvHandler(filePath: string, webhookUrl?: string): any;

  getImageTaskStatus(requestId: string): Promise<IimageTask | null>;

  processImages(requestId: string): Promise<IimageTask | null>;

  triggerWebhook(imageTask: IimageTask): Promise<void>;
}
