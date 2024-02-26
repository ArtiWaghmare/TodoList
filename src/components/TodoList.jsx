


// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// function Todolist(props) {
//   return (
//     <li className="list-item">
//     <input
//       type="checkbox"
//       checked={props.checked}
//       onChange={() => props.handleCheckboxChange(props.index)}
//       className="checkbox"
//     />
//     <span className="space-between">
//       {props.item}
//     </span>
//     <span className='icons'>
//       <FontAwesomeIcon icon={faTrashAlt} className="icon-delete" onClick={() => props.deleteItem(props.index)} />
//     </span>
//   </li>
//   );
// }

// export default Todolist;

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

