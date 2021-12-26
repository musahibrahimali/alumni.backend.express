import multer from "multer";
import {GridFsStorage} from 'multer-gridfs-storage';
import config from "../config/config";
import crypto from "crypto";
import path from "path";
import { NextFunction, Request, Response } from 'express';


const storage = new GridFsStorage({
    url: config.mongodb.DB_URL,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        // store to images bucket if file is image
        if (file.mimetype.startsWith('image')) {
            return new Promise((resolve, reject) => {
                // use crypto to generate some random hex
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const baseName = path.basename(file.originalname, path.extname(file.originalname));
                    baseName.split(' ').join('_');
                    const filename = buf.toString('hex') + "-" + baseName + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'blogimages'
                    };
                    resolve(fileInfo);
                });
            });
        }
        // store to videos bucket if file is video
        else if (file.mimetype.startsWith('video')) {
            return new Promise((resolve, reject) => {
                // use crypto to generate some random hex
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    // create new filename and add the orignal name and extention
                    const baseName = path.basename(file.originalname, path.extname(file.originalname));
                    baseName.split(' ').join('_');
                    const filename = buf.toString('hex') + "-" + baseName + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'blogvideos'
                    };
                    resolve(fileInfo);
                });
            });
        }
    },
});

const store = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 // 1GB
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

const checkFileType = (file:any, cb:any) => {
    // image types
    const imgTypes = /jpeg|jpg|png|gif/;
    const vidTypes = /mp4|avi|mkv|mov|flv|wmv|mpeg|mpg|mpe/;
    // check file extention (image or video)
    const imgExt = imgTypes.test(path.extname(file.originalname).toLowerCase());
    const vidExt = vidTypes.test(path.extname(file.originalname).toLowerCase());
    // check mime type (image or video)
    const imgMime = imgTypes.test(file.mimetype);
    const vidMime = vidTypes.test(file.mimetype);
    // if both are good, return true
    if (imgExt && imgMime) {
        cb(null, true);
    } else if (vidExt && vidMime) {
        cb(null, true);
    }
    // if both are bad, return false
    else {
        cb(null, false);
    }
}

// upload middleware
export const blogUploadMiddleware = (request:Request, response:Response, next:NextFunction) => {
    // upload images and videos
    const upload = store.fields([
        { name: 'images', maxCount: 10, }, 
        { name: 'videos', maxCount: 10, }
    ]);
    upload(request, response, (err) => {
        if(err instanceof multer.MulterError) {
            return response.status(400).json(err);
        } else if (err) {
            if(err === 'LIMIT_FILE_SIZE') {
                return response.status(400).json({
                    error: 'File size is too big'
                });
            } else if(err === 'filetype') {
                return response.status(400).json({
                    error: 'File type is not supported'
                });
            }else if(err === 'LIMIT_UNEXPECTED_FILE') {
                return response.status(400).json({
                    error: 'Unexpected file'
                });
            }
            else {
                return response.status(400).json(err);
            }
        }
        // if no error, continue
        next();
    });
}
