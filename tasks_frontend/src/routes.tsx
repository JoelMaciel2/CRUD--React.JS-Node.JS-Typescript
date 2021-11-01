import {Route , Switch} from 'react-router-dom'
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TasksForms from './pages/Tasks/Form';
import TasksDetail from './pages/Tasks/Detail'


const Routes = () =>{

    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/tarefas" exact component={Tasks}/> 
            <Route path="/tarefas_cadastro" exact component={TasksForms}/>
            <Route path="/tarefas_cadastro/:id" exact component={TasksForms} />
            <Route path="/tarefas/:id" exact component={TasksDetail} />
        </Switch>
    )
}
export default Routes