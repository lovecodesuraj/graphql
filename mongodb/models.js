import { Schema,Model } from "mongoose";

const gameSchema=Schema({
    id:id,
    title:String,
    platform:[String]
    
})


const Game=Model('Game',gameSchema);

export {Game};