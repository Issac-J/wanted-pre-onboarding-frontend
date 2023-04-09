import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    axios({
      url: "/todos",
      method: "get",
      baseURL: "https://www.pre-onboarding-selection-task.shop/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      setTodoList(res.data);
    });
  }, [todoList]);

  const handleSubmitButton = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    handleAddItem(inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = async (value) => {
    const todoItem = {
      todo: value,
    };

    axios({
      url: "/todos",
      method: "post",
      baseURL: "https://www.pre-onboarding-selection-task.shop/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: todoItem,
    });
  };

  const handleEdit = (event) => {
    setIsEdit(true);
    console.log(event.currentTarget);
    // console.log(event.target.previousElementSibling);
    // const contentElement = event.target.previousElementSibling;
  };

  const handleDelete = (event, id) => {
    axios({
      url: `/todos/${id}`,
      method: "delete",
      baseURL: "https://www.pre-onboarding-selection-task.shop/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => console.log(res));
  };

  return (
    <div className="todoWrapper">
      {/* todoList title */}
      <h2 className="todoTitle">Todo List</h2>

      {/* input form */}
      <form className="inputItemForm" onSubmit={handleSubmitButton}>
        <input
          type="text"
          value={inputValue}
          placeholder="Add Item"
          onChange={handleInputChange}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>

      {/* todo item list */}
      <div className="itemListContainer">
        {/* item */}
        {/* <div className="item">
                <input type="checkbox" className="itemCheckBox" />
                <div className="content">item1</div>
                <button className="editButton itemButton">Edit</button>
                <button className="deleteButton itemButton">Delete</button>
                </div> */}
        {todoList.map((todo) => {
          return (
            <div key={todo.id} className="item">
              <input
                className="itemCheckBox"
                type="checkbox"
                defaultChecked={todo.isCompleted}
              />
              <div className="content">{todo.todo}</div>
              <button className="editButton itemButton" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="deleteButton itemButton"
                onClick={(event) => handleDelete(event, todo.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
