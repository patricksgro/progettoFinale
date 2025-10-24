import multer from "multer";
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storageCloudinary = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'progettoFinaleEpicode'
        //se vuoi metere i tipi di estensione per file consentiti
    }
})

const uploadCloudinary = multer({ storage: storageCloudinary })

export default uploadCloudinary