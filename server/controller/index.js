const { queryDb } = require("../helper/adminHelper");

exports.Registration = async (req, res) => {
    const { username, email, mobile_no, set_password, confirm_password } = req.body;
    if (!username || !email || !mobile_no || !set_password || !confirm_password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try {
        // Call the stored procedure to insert data
        const procedureQuery = 'CALL registration(?, ?, ?, ?, ?)';
        const result = await queryDb(procedureQuery, [username, email, mobile_no, set_password, confirm_password]);
        const userId = result.insertId;
        return res.status(200).json({ msg: "Registered successfully", userId: userId, data: result });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.sqlMessage || "Something went wrong in the API call." });
    }
};

// exports.Login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ msg: 'email and password are required' });
//     }
//     try {
//         const query = 'CALL login(?, ?)';
//         const result = await queryDb(query, [email, password]);
//         const user = result[0][0];
//         return res.status(200).json({
//             msg: 'Login SuccessFully.',
//             user: {
//                 id: user.id,
//                 username: user.username,
//                 email: user.email,
//                 mobile_no: user.mobile_no,
//             },
//         });
//     } catch (e) {
//         console.error(e);
//         return res.status(500).json({ msg: 'Something went wrong in the API call' });
//     }
// };

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(201).json({ msg: 'email and password are required' });
    }
    try {
        const query = 'SELECT * FROM Registration WHERE email = ?';
        const login = await queryDb(query, [email]);
        if (login.length === 0) {
            return res.status(201).json({ msg: 'User not registered' });
        }
        const user = login[0];
        if (password !== user.set_password) {
            return res.status(201).json({ msg: 'Invalid email or password' });
        }
        return res.status(200).json({
            msg: 'Login SuccessFully.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                mobile_no: user.mobile_no,
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Something went wrong in the API call' });
    }
};

// exports.UserList = async (req, res) => {
//     const { userid } = req.params;
//     const query = userid 
//          'SELECT * FROM userlist WHERE userid = ?' 
//     queryDb(query, [Number(userid)], (err, list) => {
//         if (err) {
//             console.error('Error querying list: ' + err.stack);
//             return res.status(500).json({ error: 'Database error' });
//         }
//         if (userid && list.length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         return res.status(200).json({ msg: "Get List SuccessFully", list });
//     });
// };
exports.UserList = async (req, res) => {
    try {
      const { userid } = req.query;
  
      if (!userid)
        return res.status(201).json({
          msg: `Please provide everything`,
        });
  
      const query_for_user =
        "SELECT * FROM `userlist` WHERE `userid` = ?;";
      await queryDb(query_for_user, [Number(userid)])
        ?.then((result) => {
          return res.status(200).json({
            msg: "Data Get seccessfully ",
            data: result,
          });
        })
        .catch((e) => {
          return res.status(500).json({
            msg: `Something went wrong api calling`,
          });
        });
    } catch (e) {
      return res.status(500).json({
        msg: `Something went wrong api calling`,
      });
    }
  };

exports.Chat = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(201).json({ msg: 'Message are required' });
    }

    try {
        const query = 'SELECT * FROM chat WHERE message = ?';
        const result = await queryDb(query, [message]);
        return res.json({result });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Something went wrong in the API call' });
    }
};


// exports.Chat = async (req, res) => {
//     const { message } = req.body;
//     if (!message) {
//         return res.status(201).json({ msg: 'Msg are required' });
//     }
//     try {
//         const query = 'SELECT * FROM chat WHERE email = ?';
//         const login = await queryDb(query, [message]);
//         return res.json({ receivedMessage: message });
//     } catch (e) {
//         console.error(e);
//         return res.status(500).json({ msg: 'Something went wrong in the API call' });
//     }
// }








