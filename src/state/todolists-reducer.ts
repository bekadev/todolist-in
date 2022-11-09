import { v1 } from 'uuid';
import {TodolistType} from '../App';


type ActionType = {
    type: string
    [kay: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        }


        default:
            throw new Error('I dont understand this action type')
    }
}