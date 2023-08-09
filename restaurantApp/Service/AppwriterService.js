import { Account, ID, Client } from "appwrite";
 
 
const PROJECT_ID = "64c22092d1084c5b50dc";
const API_ENDPOINT = "https://cloud.appwrite.io/v1";

const appWriteClient = new Client();

class AppwriterService {
  account;

  constructor() {
    appWriteClient.setProject(PROJECT_ID).setEndpoint(API_ENDPOINT);
    this.account = new Account(appWriteClient);
  }

  async createUser({ email, password }) {
    try {
      
      return await this.account.create(ID.unique(), email, password);

   
  }catch(error){
    console.log("Exception occured in SignUp service ====>" + error);
  }
}

  async login({ email, password }) {
    try {
    
            return await   this.account.createEmailSession(email,password);
          

     
    } catch (err) {
      
       console.log("Exception occur"+ err);
    }
  }
}

export default AppwriterService;
