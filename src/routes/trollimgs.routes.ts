// import { NextApiRequest, NextApiResponse } from "next";
// import nc from "next-connect";
// import mongoose from "mongoose";
// import config from "../config/config";

// // next js handler

// const database = mongoose.createConnection(config.mongodb.DB_URL);
// let imgGfs:any;
// let vidGfs:any;

// database.once('open', () => {
//     imgGfs = new mongoose.mongo.GridFSBucket(database.db, {
//         bucketName: 'trollimages'
//     });
//     vidGfs = new mongoose.mongo.GridFSBucket(database.db, {
//         bucketName: 'trollimages'
//     });
// });

// const handler = nc<NextApiRequest, NextApiResponse>({ attachParams: true });

// handler.get((request, resposnse) =>{
//     const id = request.params;
//     const _id = new mongoose.Types.ObjectId(id);
//     imgGfs.find({ _id: _id }).toArray((err:any, files:any) => {
//         if(err){
//             console.log(err);
//         }
//         if(files.length > 0){
//             const readstream = imgGfs.openDownloadStream(_id);
//             readstream.pipe(response);
//         }
//     });
// });