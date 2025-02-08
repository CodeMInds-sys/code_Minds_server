const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: تسجيل مستخدم جديد
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - childAge
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               childAge:
 *                 type: number
 *     responses:
 *       201:
 *         description: تم إنشاء الحساب بنجاح
 *       400:
 *         description: خطأ في البيانات المدخلة
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: تسجيل الدخول
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول بنجاح
 *       401:
 *         description: بيانات الدخول غير صحيحة
 */
router.post('/login', login);

router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);

module.exports = router;