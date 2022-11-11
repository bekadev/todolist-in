import { v1 } from 'uuid';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';


type ActionType = RemoveTaskType | AddTaskType

export type RemoveTaskType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}
export type AddTaskType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTakType = {
    type: 'CHANGE-TASK-STATUS',
    tasksId: string
    isDone: boolean
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }

        default:
            throw new Error('I dont understand this action type')
            // return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return { type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return { type: 'ADD-TASK', title: title, todolistId}
}
export const changeTaskStatusAC = (tasksId: string, isDone: boolean,  todolistId: string): ChangeTakType => {
    return { type: 'CHANGE-TASK-STATUS', tasksId, isDone, todolistId}
}
