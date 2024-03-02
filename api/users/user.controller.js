const {create,
        getUsers,
        updateUser,
        updatePassword,
        deleteUser,
        getUserByEmail
    } = require("./user.service");

const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
 
module.exports = {
    createUser: (req, res) => {
        const body=req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },    

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                 success: 1, 
                 data: results });
        });
    },

    updateUser: (req, res) => {
        const body=req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
        updateUser(body, (err, result) => {
            if (err) {
                console.log(err);
                return ;
            }
            if(!results){
                return res.json({
                    success:0,
                    messsage:"Failed to update user"
                });
            }
            return res.json({
                 success: 1, 
                 message: "Update successful" });
        });
    },

    updatePassword: (req, res) => {
        const body=req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
        updatePassword(body, (err, result) => {
            if (err) {
                console.log(err);
                return flase ;
            }
            if(!results){
                return res.json({
                    success:0,
                    messsage:"Failed to update password"
                });
            }
            return res.json({
                 success: 1, 
                 message: "Update successful"
                 });
        });
    },

    deleteUser: (req, res) => {
        const data= req.body;

        deleteUser(data, (err, result) => {
            if (err) {
                console.log(err);
                return ;
            }
            if (!result) {
                return res.json({ 
                    success: 0,
                    message: "Record not found or no changes made" });
            }
            return res.json({ 
                success: 1, 
                message: "User deleted successfully" });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "An error occurred"
                });
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            compare(body.password, results.password, (error, result) => {
                if (error) {
                    return res.status(500).json({ success: 0, message: "An error occurred during password verification" });
                }
                if (result) {
                    results.password = undefined; // Don't return the password
                    const jsontoken = sign({ result: results }, process.env.JWT_SECRET, {
                        expiresIn: "1h"
                    });
                    return res.json({
                        success: 1,
                        message: "Login successful",
                        token: jsontoken
                    });
                } else {
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid email or password"
                    });
                }
            });
        });
    }
};