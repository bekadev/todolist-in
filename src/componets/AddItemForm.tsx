import {useState, ChangeEvent, KeyboardEvent} from "react"
import React from "react"
import Button from "@mui/material/Button/Button"
import {TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') { // trim - это уберает пробелы в начали и в конце
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }

    }
    return (
        <div>
            <TextField
                variant="outlined"
                label={'Type value'}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <Button variant="contained" onClick={addTask}>+</Button>
        </div>
    )
}