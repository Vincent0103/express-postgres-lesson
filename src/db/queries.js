import pool from "./pool";

const getAllUsernames = async () => {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

const insertUsernames = async (username) => {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

const getMatchingUsernames = async (stringPattern) => {
  const pattern = `%${stringPattern}%`;
  const { rows } = await pool.query("SELECT * FROM usernames u WHERE u.username LIKE $1", [pattern]);
  return rows;
}

export { getAllUsernames, insertUsernames, getMatchingUsernames }
