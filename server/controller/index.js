const { failMsg } = require("../helper/helperResponse");
const { queryDb } = require("../helper/adminHelper");

exports.Registration = async (req, res) => {
    const { username, email, mobile_no, set_password, confirm_password } = req.body;
    if (!username || !email || !mobile_no || !set_password || !confirm_password) {
        return res.status(400).json({ msg: 'All field is required' });
    }
    if (set_password !== confirm_password)
        return res.status(201).json({
            msg: `Password and confirm password doesn't match.`,
        });
    try {
        const checkQuery = 'SELECT * FROM Registration WHERE email = ? ';
        const duplicateUser = await queryDb(checkQuery, [email]);
        if (duplicateUser.length > 0) {
            return res.status(400).json({ msg: 'Email already registered.' });
        }

        const insertQuery = 'INSERT INTO Registration (username, email, mobile_no, set_password ,confirm_password ) VALUES (?, ?, ?, ?, ?)';
        const result = await queryDb(insertQuery, [username, email, mobile_no, set_password, confirm_password]);
        const userId = result.insertId;

        return res.status(200).json({ msg: "Registered successfully", userId: userId, data: result });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Something went wrong in the API call." });
    }
};

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'email and password are required' });
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
            msg: 'Login SuccessFully .',
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

exports.UserList = async (req, res) => {
    queryDb('SELECT * FROM Userlist', (err, list) => {
        if (err) {
            console.error('Error querying list: ' + err.stack);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(200).json({ msg: "Get List SuccessFully", list });
    });
}










