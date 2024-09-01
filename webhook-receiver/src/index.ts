// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
})


app.post('/webhook',(req:Request,res:Response)=>{
  console.log('Received webhook data');
  console.log(req.body);
  res.status(200).send('webhook received successfully')
  
})
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});