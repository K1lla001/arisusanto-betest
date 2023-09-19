const db = require('../models');
const {commonResponse} = require("../response/commonResponse");
const {generateToken} = require("../middleware/auth.middleware");
const {setToCacheWithExpiry} = require("../middleware/redis.middleware");
const Admin = db.admin;

exports.register = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return commonResponse(res, 400, "Fill all required fields", null)
    }
    try {

        const existingAdmin = await Admin.findOne({ username: username });

        if (existingAdmin) {
            return commonResponse(res, 409, "Username is already in use.", null)
        }



        const admin = new Admin({
            username : username,
            password : password
        })

        const savedAdmin = await admin.save()

        return commonResponse(res, 201, "Successfully register!", savedAdmin)
    }catch (err){
        console.log(err)
        return commonResponse(res, 500, "Error during registration", err.message)
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return commonResponse(res, 400, "Fill all required fields", null);
    }

    try {
        const admin = await Admin.findOne({ username: username, password: password });

        if (!admin) {
            return commonResponse(res, 401, "Invalid username or password", null);
        }

        const token = generateToken(admin.username);
        await setToCacheWithExpiry("user_token", token)
        return commonResponse(res, 200, "Successfully login as admin", { admin: admin, token: token });
    } catch (err) {
        console.log(err);
        return commonResponse(res, 500, "Error during login", err.message);
    }
};