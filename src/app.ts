import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todo";
import bucketRoutes from "./routes/bucket";

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(todoRoutes);
app.use(bucketRoutes);
app.use(function (err: any, req: Request, res : Response, next: NextFunction) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
})

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ifb2q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options)
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        })
    )
    .catch(error => {
        throw error;
    });
