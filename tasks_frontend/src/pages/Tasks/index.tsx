import moment from "moment";
import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import api from "../../services/api";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  updated_at: Date;
  created_at: Date;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response);
    setTasks(response.data as []);
  }
  
  function formateDate(date:Date){
    return moment(date).format("DD/MM/YYYY");
  }

  return (
    <div className="container">
      <br />
      <h1>CETIC - Tarefas</h1>
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
              <td>{ formateDate(task.updated_at) }</td>
              <td>
                <Badge  bg={task.finished ? "success" : "warning"}>
                  {task.finished ? "FINALIZADO" : "PENDENTE"}
                </Badge>
              </td>
              <td>
                <Button size="sm">Editar</Button>{' '}
                <Button size="sm" variant="success">Finalizar</Button>{' '}
                <Button size="sm" variant="info">Visualizar</Button>{' '}
                <Button size="sm" variant= "danger">Remover</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Tasks;
