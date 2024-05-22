const express = require('express')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *           example: ewr23214
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The user's email
 *           example: john@example.com
 *           password: 12345
 */


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/', (req, res) => {
  res.send('Express on Vercel')
})

router.post('/', (req, res) => {
    res.send('Express on Vercel')
})

module.exports = router;