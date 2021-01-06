import {Document} from "mongoose";

export interface IBucket extends Document {
    name: string
}