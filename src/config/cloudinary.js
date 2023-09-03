import {v2 as cloudinary} from 'cloudinary';
import "dotenv/config";

 cloudinary.config({ 
     cloud_name: 'dwgllguhy', 
     api_key: '635474996491566', 
     api_secret: 'G-aRj1Tq0iSYNZ0XbritHkuEaXk' 
   });


export default cloudinary;    