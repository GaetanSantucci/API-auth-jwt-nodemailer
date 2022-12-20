// connect to database
import { pool } from '../service/dbClient.js'

const fetchArticles = async () => {
  const result = await pool.query(`SELECT * FROM article;`)
  return result.rows
}

const fetchArticle = async (id) => {
  const query = `SELECT * FROM article WHERE id = $1;`
  const result = await pool.query(query, [id])
  return result.rows[0]
}

const createOneArticle = async (title, description) => {
  await pool.query(`INSERT INTO article (title, description) VALUES ($1, $2)`, [title, description])
}

const updateOneArticle = async (id, data) => {
  const { title, description } = data;
  await pool.query(`UPDATE article SET title = $1, description = $2 WHERE id= $3`, [title, description, id])
}

const deleteOneArticle = async (id) => {
  await pool.query(`DELETE FROM article WHERE id = $1`, [id])
}

export { fetchArticles, fetchArticle, createOneArticle, updateOneArticle, deleteOneArticle }