const {create,
    getUsers,
    updateUser,
    updatePassword,
    deleteUser,
    getUserByEmail
} = require("./user.service");

const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const bcrypt = require('bcrypt');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        // First, check if the email already exists
        getUserByEmail(body.email, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (user) {
                // User with this email already exists
                return res.status(400).json({
                    success: 0,
                    message: "Email already in use"
                });
            }
            // Email does not exist, proceed with user creation
            const salt = genSaltSync(10);
            const hashedPassword = hashSync(body.password, salt);
            body.password = hashedPassword;

            create(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
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
    const { email, password } = req.body;
    getUserByEmail(email, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "An error occurred"
            });
        }
        if (!user) {
            return res.status(401).json({
                success: 0,
                message: "Invalid email or password"
            });
        }

        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "An error occurred"
                });
            }

            if (passwordMatch) {
                return res.json({
                    success: 1,
                    message: "Login successful",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
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
}
//haaaaaaaaaaaaaaaaaaaaaaa