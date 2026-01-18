import { Router, type Request } from 'express';
import { pool } from '../database.js';
import bcrypt from 'bcrypt';
import type { ResultSetHeader } from 'mysql2';
import {
  validateRegistration,
  validateLogin,
} from '../middleware/auth-validation.js';
import type {
  User,
  UserResponse,
  LoginBody,
  RegisterBody,
} from '../interfaces.js';
import { generateToken } from '../utils/jwt.js';

const router = Router();

// Register user
router.post(
  '/register',
  validateRegistration,
  async (req: Request<Record<string, never>, unknown, RegisterBody>, res) => {
    try {
      const { email, password } = req.body;

      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [
        email,
      ]);
      const existingUsers = rows as User[];

      if (existingUsers.length > 0) {
        return res.status(400).json({
          error: 'User with this email already exists',
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO users ( email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );

      const userResponse: UserResponse = {
        id: result.insertId,
        email,
      };

      res.status(201).json({
        message: 'User registered successfully',
        user: userResponse,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        error: 'Failed to register user',
      });
    }
  }
);

// User login
router.post(
  '/login',
  validateLogin,
  async (req: Request<Record<string, never>, unknown, LoginBody>, res) => {
    try {
      const { email, password } = req.body;

      const [rows] = await pool.execute(
        'SELECT id, email, password FROM users WHERE email = ?',
        [email]
      );

      const users = rows as User[];

      if (users.length === 0) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }

      const user = users[0];

      if (!user) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }

      const validPassword = await bcrypt.compare(password, user.password!);

      if (!validPassword) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }

      const token = generateToken(user.id);

      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
      };

      res.json({
        message: 'Login successful',
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        error: 'Failed to log in',
      });
    }
  }
);

export default router;
