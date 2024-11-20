import express from 'express';
import UsersController from '../controllers/users.js';

const router = express.Router();

// CRUD routes for users
router.get('/', UsersController.getUsers); // GET all users
router.get('/:id', UsersController.getUserById); // GET a user by ID
router.post('/', UsersController.createUser); // POST a new user
router.patch('/:id', UsersController.updateUser); // PATCH (update) a user
router.delete('/:id', UsersController.deleteUser); // DELETE a user

export default router;
