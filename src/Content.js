import React from "react";

import ItemsList from "./ItemsList";

const Content = ({ items, handleChange, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemsList
          items={items}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ) : (
        <p>your ToDoList Is Empty</p>
      )}
    </>
  );
};
export default Content;
