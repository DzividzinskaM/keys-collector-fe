import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './app/views/Home/Home';
import { Profile } from './app/views/Profile/Profile';
import { Main } from './components/Main/Main';
import { Repositories } from './components/Repositories/Repositories';
import { FindForm } from './components/FindForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/home" component={Main} />
          <Route path="/repositories" component={Repositories} />
          <Route path="/find" component={FindForm} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
