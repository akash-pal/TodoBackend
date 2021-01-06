import { Request, Response, NextFunction } from "express";
import { ITodo } from "../../types/todo";
import Todo from "../../models/todo";

import { IBucket } from "../../types/bucket";
import Bucket from "../../models/buckets";

const getTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find().populate("bucket");
        res.status(200).json(todos);
    }
    catch (error) {
        next(error);
    }
}

const addTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "status" | "bucket">;

        const bucket: IBucket = new Bucket({
            name: body.bucket
        });

        const newBucket: IBucket = await bucket.save();

        const todo: ITodo = new Todo({
            name: body.name,
            status: body.status,
            bucket: newBucket._id
        });

        const newTodo: ITodo = await todo.save();
        const allTodos: ITodo[] = await Todo.find().populate("bucket");

        res.status(201).json({ todo: newTodo, todos: allTodos });
    }
    catch (error) {
        next(error);
    }
}

const updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, params: { id } } = req;
        const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    status: body.status,
                    name: body.name
                }
            },
            { new: true }
        );
        const allTodos: ITodo[] = await Todo.find().populate("bucket");
        res.status(200).json({ todo: updatedTodo, todos: allTodos })
    }
    catch (error) {
        next(error);
    }
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params: { id } } = req;
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            id
        );
        const allTodos: ITodo[] = await Todo.find().populate("bucket");
        res.status(200).json({ todo: deletedTodo, todos: allTodos })
    }
    catch (error) {
        next(error);
    }
}

const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, params: { id } } = req;
        const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    status: body.status
                }
            },
            { new: true }
        );
        const allTodos: ITodo[] = await Todo.find().populate("bucket");
        res.status(200).json({ todo: updatedTodo, todos: allTodos })
    }
    catch (error) {
        next(error);
    }
}


export { getTodos, addTodo, updateTodo, deleteTodo, updateStatus };