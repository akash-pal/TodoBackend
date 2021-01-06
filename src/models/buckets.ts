import {model, Schema} from "mongoose";
import {IBucket} from "../types/bucket";

const bucketSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default model<IBucket>("Bucket", bucketSchema);