import axios from 'axios';

export const fetchTodos = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Error fetching todos: Unexpected status code', response.status);
      throw new Error('Unexpected status code');
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    
    if (response.status === 201) {
      return response.data;
    } else {
      console.error('Error adding todo: Unexpected status code', response.status);
      throw new Error('Unexpected status code');
    }
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    
    if (response.status === 200) {
      return id;
    } else {
      console.error('Error deleting todo: Unexpected status code', response.status);
      throw new Error('Unexpected status code');
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
