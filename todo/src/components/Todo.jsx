import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const Todo = (props) => {
    const [todos, setTodos] = useContext(TodoContext);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);

    const completeTodo = (e) => {
        const updatedTodos = todos.map((item) => {
            if (item.id === props.id) {
                return { ...item, completed: e.target.checked };
            }
            return item;
        });

        setTodos(updatedTodos);
    };

    const deleteTodo = (e) => {
        e.preventDefault();
        const filteredTodos = todos.filter((item) => item.id !== props.id);
        setTodos(filteredTodos);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        const updatedTodos = todos.map((item) => {
            if (item.id === props.id) {
                return { ...item, title: editedTitle };
            }
            return item;
        });

        setTodos(updatedTodos);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedTitle(props.title);
    };

    const isCompleted = props.completed ? 'checked' : '';

    return (
        <div className={`todo-item ${editMode ? 'edit-mode' : ''}`}>
            {!editMode ? (
                <>
                    <input
                        id={props.id}
                        type="checkbox"
                        checked={isCompleted}
                        onChange={completeTodo}
                    />
                    <label htmlFor={props.id} style={{textDecoration: props.completed ? 'line-through' : 'none'}}>{props.title}</label>
                    <button id="btn-edit" className="btn" onClick={handleEdit}>Edit</button>
                    <button id="btn-delete" className="btn" onClick={deleteTodo}>Delete</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <button id="btn-save" className="btn" onClick={handleSave}>Save</button>
                    <button id="btn-cancel" className="btn" onClick={handleCancel}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default Todo;
