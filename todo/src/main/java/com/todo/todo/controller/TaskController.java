package com.todo.todo.controller;

import com.todo.todo.model.TaskModel;
import com.todo.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskService service;

    @PostMapping("/save")
    public ResponseEntity<TaskModel> saveTask(@RequestBody TaskModel task){
        if(service.validateTask(task)){
            service.saveTask(task);
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.badRequest().body(task);
    }

    @GetMapping
    public ResponseEntity<List<TaskModel>> listAll(){
        List<TaskModel> listTask = service.listAll();
        return ResponseEntity.ok(listTask);
    }

    @PutMapping("/edit")
    public ResponseEntity<TaskModel> editTask(@RequestBody TaskModel task){
        if(service.validateTask(task)){
            TaskModel updatedTask = service.update(task);
            return ResponseEntity.ok(updatedTask);
        }
        return ResponseEntity.badRequest().body(task);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        if(service.validateTaskId(id)){
            service.delete(id);
            return ResponseEntity.ok("Deletado com sucesso");
        }
        return ResponseEntity.badRequest().body("Erro ao deletar task");
    }

}
