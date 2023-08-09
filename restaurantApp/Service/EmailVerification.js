import { Account, ID, Client } from "appwrite";
const PROJECT_ID = "64c22092d1084c5b50dc";
const API_ENDPOINT = "https://cloud.appwrite.io/v1";
const appWrite = new Client();
appWrite.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
const account = new Account(appWrite);

export const EmailVerification =async ({email})=>{
                  return  await account.createVerification(email);
                
                
                }