import { Request, Response } from "express"
import { NewsModel } from '../models/models';

export class NewsController {
    constructor(){}

    // create news
    createNews = async (request:Request, response:Response) => {
        const fileData:any = request.files;
        const imageIds:string[] = [];
        const videoIds:string[] = [];
        const {
            newsTitle,
            newsSnippet,
            newsDescription,
        } = request.body;
        try{
            // get id of images and videos from request and add it to the images array
            // @ts-ignore
            if(fileData.images){
                for(let i = 0; i < fileData.images.length; i++){
                    const image = fileData.images[i];
                    imageIds.push(image.id);
                }
            }
            // get all the video ids and add it to the videos array
            // @ts-ignore
            if(fileData.videos){
                for(let i = 0; i < fileData.videos.length; i++){
                    const video = fileData.videos[i];
                    videoIds.push(video.id);
                }
            }
            const newNews = new NewsModel({
                title: newsTitle,
                snippet: newsSnippet,
                details: newsDescription,
                images: imageIds,
                videos: videoIds,
            });
            // save the new news
            const savedNews = await newNews.save();
            response.status(200).json({news: savedNews});
        }catch(error){
            return response.status(400).json({news: "Error while creating news"});
        }
    }

    // get all news
    getAllNews = async (request:Request, response:Response) => {}

    // get news by id
    getNewsById = async (request:Request, response:Response) => {}

    // get news by title
    getNewsByTitle = async (request:Request, response:Response) => {}

    // delete news
    deleteNews = async (request:Request, response:Response) => {}
}