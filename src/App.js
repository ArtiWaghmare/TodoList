


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import TodoInput from './components/TodoInput';
// import Todolist from './components/TodoList';
// import { fetchTodos, deleteTodo, addTodo } from './services/TodoService';

// function App() {
//   const [listTodo, setListTodo] = useState(() => {
//     // Retrieve todo list from localStorage or initialize an empty array if not present
//     const storedList = localStorage.getItem('todoList');
//     return storedList ? JSON.parse(storedList) : [];
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const todos = await fetchTodos();
//         setListTodo(todos);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
  
//     localStorage.setItem('todoList', JSON.stringify(listTodo));
//   }, [listTodo]);

//   const addList = (inputText) => {
//     if (inputText.trim() !== '') {
//       const newTodo = { title: inputText, completed: false };
//       setListTodo([...listTodo, newTodo]);
//       updateLocalStorage([...listTodo, newTodo]); 
//     }
//   };
  

//   const deleteListItem = (index) => {
//     const newListTodo = [...listTodo];
//     newListTodo.splice(index, 1);
//     setListTodo(newListTodo);
//     updateLocalStorage(newListTodo); 
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedTodos = [...listTodo];
//     updatedTodos[index].completed = !updatedTodos[index].completed;
//     setListTodo(updatedTodos);
//     updateLocalStorage(updatedTodos); // Update localStorage after changing todo completion status
//   };

//   const updateLocalStorage = (updatedList) => {
//     localStorage.setItem('todoList', JSON.stringify(updatedList));
//   };

//   return (
//     <div className="main-container">
//       <div className="center-container">
//         <TodoInput addList={addList} />
//         <h1 className="app-heading">TODO</h1>
//         <hr />
//         <ul className="list">
//           {listTodo.map((listItem, index) => (
//             <Todolist
//               key={index}
//               index={index}
//               item={listItem.title}
//               checked={listItem.completed}
//               handleCheckboxChange={() => handleCheckboxChange(index)}
//               deleteItem={() => deleteListItem(index)}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

// App.js
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import TodoInput from './components/TodoInput';
// import TodoList from './components/TodoList';
// import { fetchTodos, deleteTodo, addTodo } from './services/TodoService';

// function App() {
//   const [listTodo, setListTodo] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const todos = await fetchTodos();
//         setListTodo(todos);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('todoList', JSON.stringify(listTodo));
//   }, [listTodo]);

//   const addList = (inputText) => {
//     if (inputText.trim() !== '') {
//       const newTodo = { title: inputText, completed: false };
//       setListTodo([...listTodo, newTodo]);
//       updateLocalStorage([...listTodo, newTodo]);
//     }
//   };

//   const deleteListItem = (index) => {
//     const newListTodo = [...listTodo];
//     newListTodo.splice(index, 1);
//     setListTodo(newListTodo);
//     updateLocalStorage(newListTodo);
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedTodos = [...listTodo];
//     updatedTodos[index].completed = !updatedTodos[index].completed;
//     setListTodo(updatedTodos);
//     updateLocalStorage(updatedTodos);
//   };

//   const updateLocalStorage = (updatedList) => {
//     localStorage.setItem('todoList', JSON.stringify(updatedList));
//   };

//   return (
//     <div className="main-container">
//       <div className="center-container">
//         <TodoInput addList={addList} />
//         <h1 className="app-heading">TODO List</h1>
//         <hr />
//         <ul className="list">
//           {listTodo.map((listItem, index) => (
//             <TodoList
//               key={index}
//               index={index}
//               item={listItem.title}
//               checked={listItem.completed}
//               handleCheckboxChange={() => handleCheckboxChange(index)}
//               deleteItem={() => deleteListItem(index)}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

// App.js
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
