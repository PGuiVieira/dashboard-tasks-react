import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare, FiList } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    let validationRepeatTask: boolean = false;
    if (newTaskTitle === '') {
      alert('Digite algum valor');

    } else if (tasks.length > 0) {
      for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].title === newTaskTitle) {
          alert('Você já colocou essa task')
          validationRepeatTask = true
        }

      }
      if (validationRepeatTask != true) {
        setTasks([...tasks, {
          id: Math.random(),
          title: newTaskTitle,
          isComplete: false
        }])
      }

    } else {
      setTasks([...tasks, {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false
      }])
    }



    /* newTaskTitle != '' ? setTasks([...tasks, {
       id: Math.random(),
       title: newTaskTitle,
       isComplete: false
     }]) : '';
   */
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    let listTasks = [...tasks];

    listTasks.forEach((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
        setTasks(listTasks);
      }
    })


  }

  function handleRemoveTask(id: number) {
    let listTasks = [...tasks];

    listTasks.forEach((item, indice, array) => {
      if (item.id === id) {
        array.splice(indice, 1);
        setTasks(array);
      }
    })


  }

  function resetTask() {
    let initialState = { id: 0, title: '', isComplete: false }
    setTasks([]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
          <button type="button" onClick={resetTask}> Apagar lista</button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}