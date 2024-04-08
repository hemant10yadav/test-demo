import express, { Request, Response, NextFunction } from 'express';
import env from 'dotenv';
env.config();
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { getAllUsers, saveUserLocation } from './ctrl/locationCtrl';
const app = express();
const port = process.env.PORT || 3000;

// Allow Cross platform request
app.use(cors());

app.use(bodyParser.json());

app.post('/user/location', saveUserLocation);

app.get('/users', getAllUsers);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {});

mongoose
	.connect(process.env.DBURL as string)
	.then(() => {
		console.log(`Db connestion is successfully established.`);
		app.listen(port, () => {
			return console.log(`Express is listening at http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error(`Error while connecting DB: ===> ${err?.message}`);
	});
