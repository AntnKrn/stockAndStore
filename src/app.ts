import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import providerRouter from './business/routers/providers';
import productRouter from './business/routers/products';
import clientRouter from './business/routers/clients';
import employeeRouter from './business/routers/employees';
import orderRouter from "./business/routers/orders";

const app = express();

app.use(json());

app.use('/providers', providerRouter);

app.use('/products', productRouter);

app.use('/clients', clientRouter);

app.use('/employees', employeeRouter);

app.use('/orders', orderRouter);

app.use((err: Error, req: Request, res: Response) => {
    res.status(500).json({message: err.message});
});

app.listen(3000);