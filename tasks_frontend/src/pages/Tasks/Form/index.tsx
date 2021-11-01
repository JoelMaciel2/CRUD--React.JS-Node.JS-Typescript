import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";

import "./index.css";

interface ITasksResponse {
  title: string;
  description: string;
}

interface ITask {
  title: string;
  description: string;
}

const Tasks: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [model, setModel] = useState<ITask>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if(id !== undefined){
      findTask(id);
    }
  }, [id]);

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if(id !== undefined) {
      const response = await api.put(`/tasks/${id}`, model);
      
    }else{
      const response = await api.post("/tasks", model);
    }
    back();
  }

  async function findTask(id:string) {
    const response = await api.get<ITasksResponse>(`tasks/${id}`);
    setModel({ 
      title: response.data.title,
      description: response.data.description
    })
  }

  function back() {
    history.goBack();
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h3>Nova tarefa</h3>
        <Button variant="dark " size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Tasks;
