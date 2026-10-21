const fs = require("fs");
const mysql = require("mysql2/promise");

var connPool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // Aiven requires SSL; point DB_CA_PATH at the ca.pem from the Aiven console
  ssl: process.env.DB_CA_PATH ? { ca: fs.readFileSync(process.env.DB_CA_PATH) } : undefined,
});

async function addPost(data) {
  const sql = `
    INSERT INTO Posts (title, category, content, user)
    VALUES (?, ?, ?, ?)`;


  const params = [
    data.title,
    data.category,
    data.content,
    data.user
  ];

  const [result] = await connPool.query(sql, params);

  return result.insertId;
};


async function getAllPosts(page){
    const sql = `SELECT * FROM Posts ORDER BY createdtime DESC LIMIT 5 OFFSET ?`;

    const params = [(page-1) * 5];

    const [results]= await connPool.query(sql, params);

    return results;
};


async function getRecentPosts(limit){
    const sql = `SELECT * FROM Posts ORDER BY createdtime DESC LIMIT ?`;

    const params = [limit];

    const [results]= await connPool.query(sql, params);

    return results;
};

async function getPostsByCategory(category){
    const sql = `SELECT * FROM Posts WHERE category = ? ORDER BY createdtime DESC`;

    const params = [category];

    const [results]= await connPool.query(sql, params);

    return results;
};

async function getPostById(id){
  const sql = `
    SELECT Posts.*, (SELECT COUNT(*) FROM Comments WHERE post_id = Posts.id) AS commentCount
    FROM Posts WHERE id = ?`;

  const params = [id];

  const [post] = await connPool.query(sql, params);

  return post[0];
};


async function addComment(data) {
  
  const sql = `
    INSERT INTO Comments (post_id, commenter_name, comment)
    VALUES (?, ?, ?)`;


  const params = [
    data.postId,
    data.name,
    data.content,

  ];

  const [result] = await connPool.query(sql, params);

  return result.insertId;
};


async function getCommentsById(id){
  const sql = `SELECT * FROM Comments WHERE post_id = ? ORDER BY comment_id DESC`;

  const params = [id];

  const [comments] = await connPool.query(sql, params);

  return comments;
};

async function editPost(data){
  const sql = `UPDATE Posts SET title = ?, category = ?, content = ? WHERE id = ?`;

  const params = [data.title, data.category, data.content, data.id];

  await connPool.query(sql, params);

  return;
};

async function deletePost(id){
  const sql = `DELETE FROM Posts WHERE id = ?`;

  const params = [id];

  const total = await connPool.query(sql, params);

  return total;
};

async function getCommentById(id){
  const sql = `SELECT * FROM Comments WHERE comment_id = ?`;

  const params = [id];

  const [comment] = await connPool.query(sql, params);

  return comment[0];
};

async function editComment(data){
  const sql = `UPDATE Comments SET comment = ? WHERE comment_id = ?`;

  const params = [data.content, data.id];

  await connPool.query(sql, params);

  return;
};

async function deleteComment(id){
  const sql = `DELETE FROM Comments WHERE comment_id = ?`;

  const params = [id];

  const total = await connPool.query(sql, params);

  return total;
};

async function addNewUser(username, password){
  const sql = `
    INSERT INTO Users (username, password)
    VALUES (?, ?)`;


  const params = [username, password];

  const [result] = await connPool.query(sql, params);

  return result;
};

async function getPassByUN(username){
  const sql = `SELECT * FROM Users WHERE username = ?`;

    const params = [username];

    const [results]= await connPool.query(sql, params);

    if(results.length != 1){
      return -1;
    }
    return results[0];
}

async function makeAdmin(id){
  const sql = `UPDATE Users SET admin = TRUE WHERE user_id = ?`;

  const params = [id];

  await connPool.query(sql, params);

  return;
}


module.exports = {
    addPost,
    getAllPosts,
    getRecentPosts,
    getPostsByCategory,
    getPostById,
    addComment,
    getCommentsById,
    editPost,
    deletePost,
    getCommentById,
    editComment,
    deleteComment,
    addNewUser,
    getPassByUN,
    makeAdmin
  };