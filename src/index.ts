import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import handlerRoutes from "./routers/handlerRoutes";
import connectDB from "./config/dbConfig";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/handler',handlerRoutes)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
})



 app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})

