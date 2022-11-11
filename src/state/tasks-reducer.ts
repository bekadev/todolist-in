import { v1 } from 'uuid';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {AddTodolistActionType} from './todolists-reducer';


type ActionType = RemoveTaskType | AddTaskType | ChangeTakType | ChangeTitleType | AddTodolistActionType

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
export type ChangeTitleType = {
    type: 'CHANGE-TASK-TITLE',
    tasksId: string
    title: string
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
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.tasksId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.tasksId)
            if (task) {
                task.title = action.title
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}

            stateCopy[v1()] = []
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
export const changeTaskTitleAC = (tasksId: string, title: string,  todolistId: string): ChangeTitleType => {
    return { type: 'CHANGE-TASK-TITLE', tasksId, title, todolistId}
}
