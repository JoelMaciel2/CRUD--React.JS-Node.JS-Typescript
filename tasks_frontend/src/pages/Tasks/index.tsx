import moment from "moment";
import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import "./index.css";

interface ITask {
  id: number ;
  title: string;
  description: string;
  finished: boolean;
  updated_at: Date;
  created_at: Date;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response);
    setTasks(response.data as []);
  }

  async function  finishedTask(id:number){
    await api.patch(`/tasks/${id}`);
    loadTasks();
  }
  async function deleteTask(id:number){
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    history.push("/tarefas_cadastro");
  }

  function editarTask(id: number) {
    history.push(`/tarefas_cadastro/${id}`);
  }

  function viewTask(id: number) {
    history.push(`/tarefas/${id}`)
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Agendamento - Tarefas</h1>
        <Button variant="dark " size="sm" onClick={newTask}>
          Nova Tarefa
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data de atualização</th>
            <th>Status</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formateDate(task.updated_at)}</td>
              <td>
                <Badge bg={task.finished ? "success" : "warning"}>
                  {task.finished ? "FINALIZADO" : "PENDENTE"}
                </Badge>
              </td>
              <td>
                <Button size="sm"
                 onClick={() => editarTask(task.id)}
                 disabled={task.finished}
                 >
                  Editar
                </Button>{" "}
                <Button size="sm" 
                variant="success"
                onClick={() => finishedTask(task.id)}
                disabled={task.finished}
                >
                  Finalizar
                </Button>{" "}
                <Button 
                size="sm" 
                variant="info" 
                onClick={()=> viewTask(task.id)} 
                >
                  Visualizar
                </Button>{" "}
                <Button size="sm" 
                variant="danger"
                onClick={()=> deleteTask(task.id)} 
                >
                  Remover
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Tasks;
