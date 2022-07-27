import { useDispatch } from "react-redux";
import { useState } from "react";
import {register} from "../store/auth/slice";
import { useHistory } from "react-router-dom";

export default function Register(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password:"",
        password_confirmation:"",
        terms: false
    });

    function handleSubmit(e){
        e.preventDefault();

        if (!e.target.terms.checked){
          alert("You have to accept Terms and Conditions to register.");
          return;
        }

        dispatch(register(userData));

        history.push('/login');

        
    }

    return (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
         
              <input
                required placeholder="first name" value={userData.first_name}
                onChange={({ target }) => setUserData({ ...userData, first_name: target.value })}/>
                <br></br>
              <input required placeholder="last name" value={userData.last_name}
                onChange={({ target }) => setUserData({ ...userData, last_name: target.value })}/>
                    <br></br>
              <input required type="email" placeholder="Email" value={userData.email}
                onChange={({ target }) => setUserData({ ...userData, email: target.value })}/>
                    <br></br>
              <input required type="password" placeholder="Password" value={userData.password}
                onChange={({ target }) => setUserData({ ...userData, password: target.value })}/>
                    <br></br>
              <input required type="password" placeholder="Confirm password" value={userData.password_confirmation}
                onChange={({ target }) => setUserData({ ...userData, password_confirmation: target.value })}/>
                    <br></br>
              <label>
                Please read and accept Terms and Conditions before registering!
              </label>
              <br></br>
              <input required type="checkbox" name="terms" value={true}
                onChange={({ target }) => setUserData({ ...userData, terms: target.checked })}/>
                    <br></br>

            <button>Register</button>
          </form>
        </div>
    );


} 