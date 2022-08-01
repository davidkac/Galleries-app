import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/slice";
import { selectActiveUser, selectIsAuthenticated } from "../store/auth/selectors";
import '../App.css';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default function Navbar(){
    const dispatch = useDispatch();
    const activeUser = useSelector(selectActiveUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    function handleLogout(){
        dispatch(logout());
    }

    return (
      <div>
        <NavBar  bg="dark" variant="dark">
            <Container>
                <Nav>
                {isAuthenticated ? (
                    <NavBar.Brand style={{color:"red"}}>
                        User: {activeUser && activeUser.first_name} {activeUser && activeUser.last_name}  
                    </NavBar.Brand>
                ) : (
                    <Nav style={{padding:"10px", color: "red"}}>
                        Guest
                    </Nav>
                )}
                <Nav>
                    <Nav.Link as={Link} to ="/galleries">All Galleries</Nav.Link>
                </Nav>
                {isAuthenticated ? (
                    <>
                        <Nav>
                            <Nav.Link as={Link} to="/galleries/create">Create New Gallery</Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav.Link as={Link} to="/galleries/profile">My Galleries</Nav.Link>
                        </Nav>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Nav>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link >
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                    </>
                )}
                </Nav>
            </Container> 
        </NavBar>
        </div>
    );
    
} 