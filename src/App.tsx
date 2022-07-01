import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './componets/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './componets/AddItemForm';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export type FilterValuesType = 'all' | 'complited' | 'active';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])


    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Beka', isDone: true},
            {id: v1(), title: 'Ali', isDone: false},
            {id: v1(), title: 'Sem', isDone: true},
            {id: v1(), title: 'Lu', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Apple', isDone: false},
            {id: v1(), title: 'M1', isDone: true},
            {id: v1(), title: 'oil', isDone: true}
        ]
    })

    let removeTodolist = (todolistsId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistsId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistsId]
        setTasks({...tasksObj})
    }

    let onChangeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }


    function removeTasks(id: string, todolistId: string) {
        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].filter(el => el.id !== id)})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    function addTask(title: string, todolistId: string) {
        const task: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasksObj, [todolistId]: [task, ...tasksObj[todolistId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        })
    }

    function changeSpan(taskId: string, newTitle: string, todolistId: string) {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed >
                <Grid container style={ {padding: '20px'} }>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            let tasksForToDolist = tasksObj[tl.id];
                            if (tl.filter === 'complited') {
                                tasksForToDolist = tasksObj[tl.id].filter(t => t.isDone === true);
                            }

                            if (tl.filter === 'active') {
                                tasksForToDolist = tasksObj[tl.id].filter(t => t.isDone === false);
                            }
                            return (
                                <Grid item>
                                    <Paper style={ {padding: '10px'} }>
                                    <Todolist
                                        onChangeTodolistTitle={onChangeTodolistTitle}
                                        removeTodolist={removeTodolist}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForToDolist}
                                        removeTasks={removeTasks}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeSpan={changeSpan}
                                        filter={tl.filter}
                                    />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
