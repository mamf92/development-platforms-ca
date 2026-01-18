import { Router } from "express";
import type { Request } from "express";
import { pool } from "../database.js";
import type { ArticleWithUser, CreateArticleBody } from "../interfaces.js";
import { validateArticleData } from "../middleware/article-validation.js";
import { authenticateToken } from "../middleware/auth-validation.js";
import type { ResultSetHeader } from "mysql2";

const router = Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles with user details
 *     description: Retrieve all articles with their associated user information, ordered by creation date (newest first)
 *     responses:
 *       200:
 *         description: Successfully retrieved articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Article ID
 *                   title:
 *                     type: string
 *                     description: Article title
 *                   body:
 *                     type: string
 *                     description: Article body
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Article creation timestamp
 *                   user_id:
 *                     type: number
 *                     description: User ID of author
 *                   category:
 *                     type: string
 *                     description: Article category
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Author email address
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch articles"
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT articles.id, articles.title, articles.body, articles.category, articles.created_at, articles.user_id, users.email
      FROM articles
      INNER JOIN users ON articles.user_id = users.id
      ORDER BY articles.created_at DESC
    `);

    const articles = rows as ArticleWithUser[];
    res.json(articles);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     description: Create a new article with title, body, and category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the article
 *                 minLength: 1
 *               body:
 *                 type: string
 *                 description: Body text of the article
 *               category:
 *                 type: string
 *                 description: Category of article matching either news, sports, culture, or technology
 *     responses:
 *       201:
 *         description: Article successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Article ID
 *                 title:
 *                   type: string
 *                   description: Article title
 *                 body:
 *                   type: string
 *                   description: Article body
 *                 category:
 *                   type: string
 *                   description: Article category
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Article creation timestamp
 *                 user_id:
 *                   type: number
 *                   description: User ID of author
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of author
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create article"
 */
router.post(
  "/",
  authenticateToken,
  validateArticleData,
  async (req: Request<Record<string, never>, unknown, CreateArticleBody>, res) => {
    const { title, body, category } = req.body;
    const userId = req.user?.id;

    try {
      const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO articles (title, body, category, user_id) VALUES (?, ?, ?, ?)",
        [title, body, category, userId]
      );

      const [rows] = await pool.execute(
        `SELECT articles.id, articles.title, articles.body, articles.category, articles.created_at, articles.user_id, users.email
       FROM articles
       INNER JOIN users ON articles.user_id = users.id
       WHERE articles.id = ?`,
        [result.insertId]
      );

      const article = (rows as ArticleWithUser[])[0];
      res.status(201).json(article);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed to create article" });
    }
  }
);

export default router;
