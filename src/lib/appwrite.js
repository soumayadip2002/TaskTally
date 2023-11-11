import {Databases, Client, Account} from 'appwrite';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const PROJECTID = import.meta.env.VITE_PROJECT_ID;

const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECTID);
export const acount = new Account(client);
export const databases = new Databases(client);