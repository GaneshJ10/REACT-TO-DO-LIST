import React from "react";
import { FaTrashAlt } from "react-icons/fa";
const LineItems = ({ item, handleChange, handleDelete }) => {
  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleChange(item.id)}
      />

      <label
        style={item.checked ? { textDecoration: "Line-through" } : null}
        onDoubleClick={() => handleChange(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete${item.item}`}
      />
    </li>
  );
};

export default LineItems;
