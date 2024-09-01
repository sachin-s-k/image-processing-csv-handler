import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import handlerRoutes from "./routers/handlerRoutes";
import connectDB from "./config/dbConfig";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
  res.status(500).json({message:'An error occurred.'})
})
app.use('/handler',handlerRoutes)
app.get("/", (req: Request, res: Response) => {
  res.send("hello this is an Image processing csv handler !");
})

 app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})

