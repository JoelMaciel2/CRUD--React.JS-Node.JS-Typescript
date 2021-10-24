import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import routes from "./routes";
import * as cors from "cors";


require('dotenv').config();


const app = express();
createConnection();

app.use(cors());
app.use(express.json());
console.log("Servidor rodando");


app.use(routes);

app.listen(3333);

