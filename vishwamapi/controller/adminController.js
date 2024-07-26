const { admin } = require("../modal/adminModal");
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).json({ error: "please filled the field properly" })
    }
    try {
        const user = await admin.findOne({ username: username })
        if (user) {
            return res.status(422).json({ error: 'username already exist' })
        }
        else {
            const admins = new admin({ username, password });
            await admins.save();
            res.status(201).json({ message: "admin register successfuly" });
        }
    } catch (error) {

    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "please filled the data" });
        }
        const adminlogin = await admin.findOne({ username: username });
 
        if(adminlogin){

            const isMatch = await bcrypt.compare(password, adminlogin.password);
            
            if (isMatch) {
                const token = await adminlogin.generateAuthToken();

                return res.status(200).json({
                    status: "success",
                    message: "Logged in successfully",
                    adminlogin,
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


exports.getadmin = async (req, res) => {
    try {
        const data = await admin.find()
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}