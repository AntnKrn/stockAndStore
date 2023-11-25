import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import providerRouter from './business/routers/providers';
import productsRouter from './business/routers/products';
import clientsRouter from './business/routers/clients';
import employeeRouter from './business/routers/employees';

const app = express();

app.use(json());

app.use('/providers', providerRouter);

app.use('/products', productsRouter);

app.use('/clients', clientsRouter);

app.use('/employees', employeeRouter);

app.use((err: Error, req: Request, res: Response) => {
    res.status(500).json({message: err.message});
});

app.listen(3000);