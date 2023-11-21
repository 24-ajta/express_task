import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userSchema from "./schema/user.schema.js";

const { sign } = jwt;


export async function register(req, res) {
    try {
        let { username, email,password } = req.body;
        // if( username.length < 4 && password.length < 4) {
        //     return res.json("Invalid username or password");
        // }
        
        let userExist = await userSchema.findOne({ username });
        if(userExist) {
            return res.status(400).send("User already exists");
        }
        let hashedPass = await bcrypt.hash(password, 10);
        let result = await userSchema.create({ username,email, password: hashedPass });
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

export async function profile(req, res) {
    try {
        let user = req.user;
        let userDetails = await userSchema.findOne({ _id: user.id },{ password: 0 });
        if(userDetails) {
            return res.json(userDetails);
        }
        return res.status(404).send("User not found");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
}
