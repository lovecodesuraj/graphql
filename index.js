import { config } from "dotenv";
config();
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import db from "./db.js";
import connecToMongoDb from "./mongodb/db.js";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const PORT=process.env.PORT;



const app=express();
app.use(bodyParser.urlencoded())

const server= new ApolloServer({
   typeDefs,
   resolvers
})

async function startSever(){
    try {
        await connecToMongoDb();
        const {url}=await startStandaloneServer(server,{
            listen:{port:PORT}
        })
        console.log(`Server is ruuning on port ${PORT} \n ${url}`);
        
    } catch (error) {
        console.log({error})
    }

}


startSever();