const express = require("express");
const { Registration, Login, UserList, profile} = require("../controller");
const router = express.Router();

router.post("/api/user_registration",Registration);
router.post("/api/user_login",Login);
router.get("/api/user_list",UserList);






module.exports = router;