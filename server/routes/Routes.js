const express = require("express");
const { Registration, Login, UserList, profile, Chat} = require("../controller");
const router = express.Router();

router.post("/api/user_registration",Registration);
router.post("/api/user_login",Login);
router.get("/api/user_list",UserList);
router.post("/api/user_chat",Chat);





module.exports = router;