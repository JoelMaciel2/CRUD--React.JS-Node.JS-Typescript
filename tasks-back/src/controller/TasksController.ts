import { getRepository } from "typeorm";
import { Task } from "../entity/Task";
import { Request, Response } from "express";
import { request } from "http";

export const getTasks = async (request: Request, response: Response) => {
  const tasks = await getRepository(Task).find();
  return response.json(tasks);
};

export const getTask = async (request:Request , response:Response)=> {
    const { id } =  request.params;
    const task = await getRepository(Task).findOne(id);
    return response.json(task);
} 

export const saveTask = async (request:Request, response: Response) => {
    const task = await getRepository(Task).save(request.body);
    return response.json(task);
}
export const updateTask = async (request:Request, response:Response) => {
    const { id } = request.params;

    const task = await getRepository(Task).update(id, request.body);

    if(task.affected === 1){
        const taskUpdate = await getRepository(Task).findOne(id);
        return  response.json(taskUpdate);
    }
    response.status(404).json({message: "Task not found."});
};

export const finishedTask = async (request:Request,  response:Response) => {
    const {id} = request.params;

    const task  = await getRepository(Task).update(id, {finished: true});

    if(task.affected === 1){
        const taskUpdate = await getRepository(Task).findOne(id);
        return response.json({message: "Task finished"});
    }
    return response.status(404).json({message: "Task not found"});
};
export const  removeTask = async (request : Request, response: Response) =>{
    const { id } = request.params;

    const task = await getRepository(Task).delete(id);

    if(task.affected === 1){
        const taskRemove = await getRepository(Task).findOne(id);
        return response.json({message: 'Task removida'})
    }
    return response.status(404).json({message: "Task not found"})
};
