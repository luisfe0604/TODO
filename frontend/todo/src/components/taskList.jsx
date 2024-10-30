/* eslint-disable react/prop-types */
import { ListBox } from "primereact/listbox";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

import "../App.css";

const TaskList = ({ tasks, onToggle, onEdit, onRemove }) => {
  return (
    <ListBox
      options={tasks}
      optionLabel="label"
      className="listbox"
      itemTemplate={(option) => (
        <div className="p-d-flex p-jc-between">
          <Checkbox
            checked={option.completed}
            onChange={() => onToggle(option)}
          />
          <span>{option.task}</span>
          <div className="p-d-flex p-ai-center">
            <Button
              icon="pi pi-pencil"
              className="p-button-text listbox-button"
              onClick={() => onEdit(option)}
            />
            <Button
              icon="pi pi-times"
              className="p-button-text p-button-danger listbox-button"
              onClick={() => onRemove(option.id)}
            />
          </div>
        </div>
      )}
    />
  );
};

export default TaskList;
