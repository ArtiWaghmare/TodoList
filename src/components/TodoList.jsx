import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Todolist(props) {
  const { item, checked, handleCheckboxChange, deleteItem } = props;

  return (
    <li className={`list-item ${checked ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="checkbox" 
      />
      <span className="space-between">
        <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>{item}</span>
      </span>
      <span className='icons'>
        <FontAwesomeIcon icon={faTrashAlt} className="icon-delete" onClick={deleteItem} />
      </span>
    </li>
  );
}

export default Todolist;

