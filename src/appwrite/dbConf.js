import { Client, Databases, ID, Query, Storage } from "appwrite";
// import Conf from './conf/Conf'
import Conf from "../conf/Conf";

class DbService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(Conf.appwriteUrl)
            .setProject(Conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, content, slug, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite :: createPost :: error"+error)
            return false
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        console.log(content)
        console.log(typeof content)
        try {
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite :: updatePost :: error"+error)
            return false
        }
    }

    async deletePost(slug){
        try {
            await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite :: deletePost :: error"+error)
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log("Appwrite :: getPost :: error"+error)
            return false
        }
    }

    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error"+error)
            return false
        }
    }

    // Bucket Service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error"+error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                Conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error"+error)
            return false
        }
    }

    filePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                Conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: filePreview :: error"+error)
            return false
        }
    }

}

const dbService = new DbService()

export default dbService