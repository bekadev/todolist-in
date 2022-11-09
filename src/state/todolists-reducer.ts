import {TodolistType} from '../App';


type ActionType = {
    type: string
    [kay: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {

        default:
            throw new Error('I dont understand this action type')
    }
}