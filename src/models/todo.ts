import {model, Schema} from "mongoose";
import {ITodo} from "../types/todo";

const todoSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    bucket: {
        type: Schema.Types.ObjectId,
        ref: "Bucket"
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model<ITodo>("Todo", todoSchema);