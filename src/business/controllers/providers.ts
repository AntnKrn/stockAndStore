import { RequestHandler } from "express";

import { Provider } from '../models/Provider';
import ProvidersData from "../../data/Providers";

export const getProviders: RequestHandler = async (req, res, next) => {
    try {
        const providers: any = await ProvidersData.fetchProviders();

        const data = providers.map((provider: Provider) => ({
            name: provider.name,
            phoneNumber: provider.phoneNumber,
            category: provider.category,
            address: provider.address,
            contactPerson: provider.contactPerson,
            email: provider.email
        }));

        res.status(200).json(data);
    } catch(err) {
        console.log('Error from controller getProviders');
    } 
}

export const addProvider: RequestHandler = async (req, res, next) => {
    try {
        const { name, phoneNumber, category, address, contactPerson, email }: Provider = req.body;
        const newProvider = new Provider(name, phoneNumber, category, address, contactPerson, email);

        await ProvidersData.postProvider(newProvider);
        res.status(201).json({ message: 'Created a provider', createdProvider: newProvider });
    } catch(err) {
        console.log(err, 'Error from controller addProvider')
    }
}

export const editProvider: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, phoneNumber, category, address, contactPerson, email }: Provider = req.body;
        const updatedProvider = new Provider(name, phoneNumber, category, address, contactPerson, email, id);
        console.log(updatedProvider);

        await ProvidersData.editProvider(updatedProvider);
        res.status(201).json({ message: 'Updated a provider', updatedProvider: updatedProvider })
    } catch(err) {
        console.log(err, "error from controller edit provider")
    }
}

export const deleteProvider: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        await ProvidersData.deleteProvider(id);

        res.status(201).json({ message: 'Provider deleted', deleteProvider: id });
    } catch(err) {
        console.log(err, "error from deleteRpovider constructor")
    }
}