import Conf from '../conf/Conf';
import {Client, Account, ID} from 'appwrite'

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(Conf.appwriteUrl)
            .setProject(Conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try{
            const loginSession = await this.account.createEmailPasswordSession(email, password)
            return loginSession
        }catch (error){
            throw error
        }
    }
    
    async getUser(){
        try{
            return await this.account.get()
        }catch (error){
            console.log("Appwrite :: getUser :: error ::"+error)
        }
        return null;
    }
    
    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite :: logout :: error ::"+error)
        }
    }

}

const authService = new AuthService()
export default authService