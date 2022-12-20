import { pool } from '../service/dbClient.js';

const fetchAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM "user" ORDER BY "id" ASC`);
  return result.rows
}

const createData = async (data) => {
  const { username, password, isAdmin } = data
  await pool.query(`INSERT INTO "user" (username, password, isAdmin) VALUES ($1, $2, $3)`, [username, password, isAdmin])
}

const fetchUser = async (username) => {
  const result = await pool.query(`SELECT * FROM "user" WHERE username = $1`, [username])
  if (result.rowCount === 0) return null;
  return result.rows[0]
}

const fetchUserByID = async (id) => {
  const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [id])
  return result.rows[0]
}

const updatedUserProfile = async (userData, id) => {
  const { username, password, isAdmin } = userData
  await pool.query(`UPDATE "user" SET 
    "username" = COALESCE(( $1 )::TEXT, username),
    "password" = COALESCE(( $2 )::TEXT, password),
    "isadmin" = COALESCE(( $3) ::BOOLEAN, isadmin)
      WHERE id= $4`, [username, password, isAdmin, id])
}

const deletedUserProfile = async (id) => {
  await pool.query(`DELETE FROM "user" WHERE id = $1`, [id])
}

export { fetchAllUsers, createData, fetchUser, fetchUserByID, updatedUserProfile, deletedUserProfile }