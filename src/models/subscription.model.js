import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber:{
        type: Schema.Types.ObjectId, //one who is subscribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId, //whom is being subscribed
        ref: "User"
    },

},{timestamps: true})

export const Subscription = mongoose.model("Subscription",subscriptionSchema) 