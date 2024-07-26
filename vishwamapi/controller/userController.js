const { user } = require("../modal/userModel");
const bcrypt = require('bcrypt');


exports.registeruser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ error: "please filled the field properly" })
    }
    try {
        const users = await user.findOne({ username: username })
        if (users) {
            return res.status(422).json({ error: 'username already exist' })
        }
        else {
            const users = new user({ username, password });
            await users.save();
            res.status(201).json({ message: "user register successfuly" });
        }
    } catch (error) {

    }
}

exports.loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "please filled the data" });
        }
        const userlogin = await user.findOne({ username: username });
 
        if(userlogin){

            const isMatch = await bcrypt.compare(password, userlogin.password);
            
            if (isMatch) {
                const token = await userlogin.generateAuthToken();

                return res.status(200).json({
                    status: "success",
                    message: "Logged in successfully",
                    userlogin,
                    token, 
                });
                 
            } else {
                return res.status(401).json({
                    status: "False",
                    message: "Password don't match"
                });
            }
        }else{
            return res.status(401).json({
                status: "False",
                message: "Invalid credentials"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Login failed"
        });
    }
}


exports.getuser = async (req, res) => {
    try {
        const data = await user.find()
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}