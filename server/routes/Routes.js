const express = require("express");
const { Registration, Login, UserList, addContact, Contactlist, SendMessage,RecieverList} = require("../controller");
const router = express.Router();

router.post("/api/user_registration",Registration);
router.post("/api/user_login",Login);
router.get("/api/user_list",UserList);
router.post("/api/add_contact",addContact);
router.get("/api/contact_list",Contactlist);
router.post("/api/send_messgage",SendMessage);
router.get("/api/recieve_messgage",RecieverList);
// router.post("/api/user_chat",Chat);





module.exports = router;