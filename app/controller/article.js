// import model
import { fetchArticles, fetchArticle, createOneArticle, updateOneArticle, deleteOneArticle } from '../datamapper/article.js';

// create function getAllArticles

const getAllArticles = async (_, res) => {
  try {
    // faire le lien avec le datamapper
    const articles = await fetchArticles();
    return res.json(articles)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const getArticle = async (req, res) => {
  const id = +req.params.id
  try {
    const result = await fetchArticle(id);
    return res.json(result)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const createArticle = async (req, res) => {
  const { title, description } = req.body;
  try {
    await createOneArticle(title, description);
    return res.json("Article created")
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const updateArticle = async (req, res) => {
  const id = +req.params.id;
  try {
    await updateOneArticle(id, req.body)
    return res.json("Article updated")
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const deleteArticle = async (req, res) => {
  const id = +req.params.id;
  try {
    await deleteOneArticle(id)
    return res.json("Article deleted")
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle }; 