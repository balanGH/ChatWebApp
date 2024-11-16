
const pool = require('../config/db');

// Function to get messages between two users
exports.getChat = async (req, res) => {
  const userId = parseInt(req.params.id, 10);  // Logged-in user ID
  const oppositeUserId = parseInt(req.params.oid, 10);  // Opposite user ID
  
  try {
    const result = await pool.query(`
      SELECT *
      FROM Messages
      WHERE (sender_id = $1 AND receiver_id = $2) 
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC
    `, [userId, oppositeUserId]);

    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to insert a chat message
exports.sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message_text, message_type, media_url } = req.body;
  console.log("fedc");
  

  try {
    const result = await pool.query(`
      INSERT INTO Messages (sender_id, receiver_id, message_text, message_type, media_url, created_at, is_read)
      VALUES ($1, $2, $3, $4, $5, NOW(), $6)
      RETURNING message_id, created_at
    `, [sender_id, receiver_id, message_text, message_type || null, media_url || null, false]);

    // Send back the inserted message details
    res.status(201).json({ message: 'Message sent successfully', messageDetails: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
