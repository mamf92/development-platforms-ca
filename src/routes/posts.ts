import { Router } from "express";
import { pool } from "../database.js";
import type { PostWithUser } from "../interfaces.js";

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts with user details
 *     description: Retrieve all posts with their associated user information, ordered by creation date (newest first)
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Post ID
 *                   title:
 *                     type: string
 *                     description: Post title
 *                   content:
 *                     type: string
 *                     description: Post content
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Post creation timestamp
 *                   username:
 *                     type: string
 *                     description: Author username
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
 *                   example: "Failed to fetch user"
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      select posts.title, posts.content, posts.id, posts.created_at, users.username, users.email
      from posts
      inner join users on posts.user_id = users.id
      order by posts.created_at desc
      `);

    const posts = rows as PostWithUser[];

    res.json(posts);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;