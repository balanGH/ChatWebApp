const pool = require('../config/db');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];
    console.log("123");

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Directly compare plain text passwords
    if (password !== user.password) {
      console.log("123");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send user data along with the token
    const { password: _, ...userData } = user; // Exclude password from response
    res.json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
