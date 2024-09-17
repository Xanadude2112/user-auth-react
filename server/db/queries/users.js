const db = require("../connection");

//CREATE

// This function is responsible for creating a new user in the database.
const createUser = async (users) => {
  const { username, email, password } = users;
  try {
    const data = await db.query(
      `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [username, email, password]
    );
    return data.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

//READ

// This function is responsible for fetching all users from the database.
const getAllUsers = async () => {
  try {
    const data = await db.query(`
      SELECT * FROM users;
      `);
    return data.rows;
  } catch (err) {
    console.log(err.message);
  }
};

// This function is responsible for fetching a user by their id from the database.
const getUserById = async (id) => {
  try {
    const data = await db.query(
      `
      SELECT * FROM users WHERE id = $1;`,
      [id]
    );
    return data.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

// This function is responsible for fetching a user by their email from the database.
const getUserByEmail = async (email) => {
  try {
    const data = await db.query(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email]
    );
    return data.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

//UPDATE

// This function is responsible for updating a user in the database.
const updateUser = async (id, username, email) => {
  try {
    const data = await db.query(
      `
      UPDATE users
      SET username = $2, email = $3
      WHERE id = $1
      RETURNING *;
      `,
      [id, username, email]
    );
    return data.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

//DELETE

const deleteUser = async (id) => {
  try {
    const data = await db.query(
      `
      DELETE FROM users WHERE id = $1; 
      `,
      [id]
    );
    return data.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
