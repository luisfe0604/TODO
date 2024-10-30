package com.todo.todo.service;

import com.todo.todo.model.TaskModel;
import com.todo.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    public TaskRepository taskRepository;

    public void saveTask(TaskModel task){
        taskRepository.save(task);
    }

    public List<TaskModel> listAll(){
        return taskRepository.findAll();
    }

    public TaskModel update(TaskModel task){
        return taskRepository.save(task);
    }

    public void delete(Long id){
        taskRepository.deleteById(id);
    }

    public Boolean validateTask(TaskModel task){
        return task.getTask() != null && !task.getTask().isBlank();
    }

    public Boolean validateTaskId(Long id) {
        return id != null && id > 0;
    }
}
