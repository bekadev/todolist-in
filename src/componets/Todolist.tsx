import React, {ChangeEvent} from "react"
import {FilterValuesType} from "../App"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (todolistId: string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeSpan: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    onChangeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onComplitedClickHandler = () => props.changeFilter('complited', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeTodolistTitle = (newTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>  <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={removeTodolist} color="secondary">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTasks(t.id, props.id)
                        }
                        const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id);
                        }
                        const onSpanChangeHandler = (newValue: string) => {
                            props.changeSpan(t.id, newValue, props.id);
                        }

                        // @ts-ignore
                        return <li
                            className={t.isDone ? 'is-done' : ''}
                            key={t.id}><input
                            onChange={onInputChangeHandler}
                            type="checkbox" checked={t.isDone}/>
                            <EditableSpan
                                title={t.title}
                                onChange={onSpanChangeHandler}/>
                            <IconButton onClick={onRemoveHandler} color="secondary">
                                <Delete/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}  onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'complited' ? 'contained' : 'text'}
                        onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

