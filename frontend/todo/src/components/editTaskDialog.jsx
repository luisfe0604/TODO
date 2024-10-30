/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const EditTaskDialog = ({ visible, task, onHide, onConfirm }) => {
  const [editedTaskLabel, setEditedTaskLabel] = useState(task ? task.task : "");

  useEffect(() => {
    if (task) {
      setEditedTaskLabel(task.task);
    }
  }, [task]);

  const handleConfirm = () => {
    onConfirm(editedTaskLabel);
    onHide();
  };

  return (
    <Dialog header="Editar Tarefa" className="dialog" visible={visible} onHide={onHide}>
      <div className="p-field">
        <label htmlFor="taskLabel" className="labelDialog">Nova descrição da tarefa: </label>
        <InputText
          id="taskLabel"
          value={editedTaskLabel}
          onChange={(e) => setEditedTaskLabel(e.target.value)}
        />
      </div>
      <Button label="Salvar" id="taskButton" icon="pi pi-check" onClick={handleConfirm} />
    </Dialog>
  );
};

export default EditTaskDialog;
