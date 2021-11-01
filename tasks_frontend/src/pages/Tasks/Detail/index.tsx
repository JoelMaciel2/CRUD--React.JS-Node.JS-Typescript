import moment from "moment";
import { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id]);

  function back() {
    history.goBack();
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    setTask(response.data);
  }
  function formateDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Detalhes do agendamento</h1>
        <Button variant="dark" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>{task?.description}</Card.Text>
          <br />
          <Badge bg={task?.finished ? "success" : "warning"}>
            {task?.finished ? "FINALIZADO " : "PENDENTE"}
          </Badge><br />
          <strong>Data do Cadastro :  </strong>
          <Badge bg="info">
              {formateDate(task?.created_at)}
          </Badge><br />
          <strong>Data da Atualização :  </strong>
          <Badge bg="info">
              {formateDate(task?.updated_at)}
          </Badge><br />
        </Card.Body>
      </Card>
    </div>
  );
};
export default Detail;
