import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { fetchTodos, deleteTodo, addTodo } from './services/TodoService';

function App() {
  const [listTodo, setListTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await fetchTodos();
        setListTodo(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = async (inputText) => {
    if (inputText.trim() !== '') {
      try {
        const newTodo = { title: inputText, completed: false };
        const addedTodo = await addTodo(newTodo);
        setListTodo([...listTodo, addedTodo]);
        updateLocalStorage([...listTodo, addedTodo]);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const deleteListItem = async (id) => {
    try {
      await deleteTodo(id);
      const newListTodo = listTodo.filter(todo => todo.id !== id);
      setListTodo(newListTodo);
      updateLocalStorage(newListTodo);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedTodos = listTodo.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setListTodo(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  const updateLocalStorage = (updatedList) => {
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO List</h1>
        <hr />
        <ul className="list">
          {listTodo.map((listItem, index) => (
            <TodoList
              key={index}
              id={listItem.id}
              item={listItem.title}
              checked={listItem.completed}
              handleCheckboxChange={() => handleCheckboxChange(listItem.id)}
              deleteItem={() => deleteListItem(listItem.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
