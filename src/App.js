import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redicert,
} from "react-router-dom";
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">login</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path='/login'>
            <Login />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
