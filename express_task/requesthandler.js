import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userSchema from "./schema/user.schema.js";
import fileSchema from "./schema/file.schema.js";

const { sign } = jwt;


export async function register(req, res) {
    try {
        let { username, email,password,file } = req.body;
        // if( username.length < 4 && password.length < 4) {
        //     return res.json("Invalid username or password");
        // }
        let hashedPass = await bcrypt.hash(password, 10);
        let userExist = await userSchema.findOne({ username });
        if(userExist) {
            return res.status(400).send("User already exists");
        }
        let result = await userSchema.create({ username,email, password: hashedPass,file });
        if(result){
            return res.status(200).send("Registration successful!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export async function login(req, res) {
    try {
        let { username, password } = req.body;
        // if( username.length < 4 && password.length < 4) {
        //     return res.json("Invalid username or password");
        // }
        let user = await userSchema.findOne({ username });
        if(!user) {
            return res.status(400).send("Invalid username or password");
        }
        let passCheck = await bcrypt.compare(password, user.password);
        if(passCheck) {
            let token = await sign({
                username: user.username,
                id: user._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "24h"
            })
            return res.status(200).json({
                msg: "Login successful...",
                token: token
            })
        }
        return res.status(403).send("invalid username or password")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}

export async function getprofile(req, res) {
    try {
        let {id} = req.user;
        let userDetails = await userSchema.find({ _id:id });
           console.log(userDetails);
        if(userDetails.length > 0) {
            return res.status(200).send(userDetails);
        }
        return res.status(404).send("error");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error Occured");
    }
}

export async function uploadFile(req,res){
    try {
        let {data,myfile} = req.body

        let result = await fileSchema.create({
            data,
            myfile
        })
        if(result){
            return res.json("Blog created Successfully...")
        }
        return res.status(500).send("Error Occured")
    } catch (error) {
       console.log(error); 
       return res.status(500).send("error occured")
    }
}

export async function getfile(req,res){
    try {
        let data = await fileSchema.find();
        return res.json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send("error occured")
    }
}

// export async function logout(req,res){
//     try {
//         console.log(req.user);
        
//         console.log("logout successfully")
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("error")
//     }
// }