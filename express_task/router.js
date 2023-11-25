import {Router} from "express";
import auth from "./middlewares/auth.js"
// import multer from "multer";
import path from "path"


import * as rh from "./requesthandler.js";

// const storage = multer.diskStorage({
//     destination:"./files",
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
// }})

// const upload = multer({storage:storage});

const router = Router()

router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/profile").get(auth,rh.profile);
router.route("/upload").post(auth,rh.uploadFile);
router.route("/get-profile").get(auth,rh.getprofile);
router.route("/get-file").get(rh.getfile);
// router.route("/logout").get(auth,rh.logout);
export default router;