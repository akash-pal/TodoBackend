import { Router } from "express";

import { addTodo, getTodos, deleteTodo, updateTodo, updateStatus } from "../controllers/todos";

const router: Router = Router();

router.get('/todos', getTodos);

router.post("/add-todo", addTodo);

router.put("/edit-todo/:id", updateTodo);

router.put("/update-status/:id", updateStatus);

router.delete("/delete-todo/:id", deleteTodo);

export default router;