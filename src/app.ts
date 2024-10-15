console.log("program started");
import express from "express";
import "dotenv/config"
import { connectToDB } from "./Config/dbConfig";
import cookieParser from "cookie-parser";
import { specs, swaggerUi } from "./Swagger/Swagger"
import  UserRouter  from "./Routers/TeacherRouter";
import  TodoRouter  from "./Routers/StudentRouter";
import AuthRouter from "./Routers/AuthRouter";
import { ErrorRequestHandler } from "express";

const app = express();


connectToDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
      console.error("Invalid JSON:", err);
      res.status(400).json({ message: "Invalid JSON" });
    } else {
      next(err);
    }
  };
  
app.use(errorHandler);

app.use('/teachers', UserRouter);
app.use('/students',TodoRouter);
app.use('/auth',AuthRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
})



