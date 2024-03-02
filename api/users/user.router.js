const { createUser,
    getUsers,
    updateUser,
    updatePassword,
    deleteUser,
    login
} = require("./user.controller");
const router = require("express").Router();

router.post("/addUser", createUser);
router.get("/getUser", getUsers);
router.patch("/updateUser", updateUser);
router.patch("/updatePassword", updatePassword);
router.delete("/deleteUser", deleteUser);
router.post("/login", login);

module.exports = router;