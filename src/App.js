import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import './App.css';
import { selectActiveUser,selectIsAuthenticated} from './store/auth/selectors';
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from "react";
import { getActiveUser } from "./store/auth/slice";
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Galleries from './pages/Galleries';
import CreateGallery from "./pages/CreateGallery";
import PrivateRoute from "./components/shared/PrivateRoute";
import GuestRoute from "./components/shared/GuestRoute";


function App() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);


useEffect(() => {
  if (isAuthenticated) {
    dispatch(getActiveUser());
  }
}, 
[dispatch, isAuthenticated]);

  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Switch>
          <GuestRoute exact path="/register">
            <Register/>
          </GuestRoute>
          <GuestRoute exact path='/login'>
            <Login />
          </GuestRoute>
          <GuestRoute exact path="/">
           <Redirect to="/galleries" />
          </GuestRoute>
          <Route exact path="/galleries">
           <Galleries />
           </Route>
          <PrivateRoute exact path="/galleries/create">
            <CreateGallery />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
