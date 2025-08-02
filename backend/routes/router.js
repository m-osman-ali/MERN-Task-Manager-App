import express from 'express';
import {createTask} from '../controllers/taskController.js';
import {fetchTask} from '../controllers/taskController.js';
import {updateById} from '../controllers/taskController.js';
import {deleteByID} from '../controllers/taskController.js';
const router = express.Router();


router.post('/', createTask);
router.get('/', fetchTask);
router.put('/:id', updateById);
router.delete('/:id', deleteByID);


export default router;

