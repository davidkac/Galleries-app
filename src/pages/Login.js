import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { login } from "../store/auth/slice";
import { selectLoginError } from "../store/auth/selectors";


export default function Login(){
    const dispatch = useDispatch();
    const loginError = useSelector(selectLoginError);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(login(credentials));
    }

    return (
        <div style={{backgroundColor:"#D0D0D0"}}>
          <h2 >Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input required type="email" placeholder="Email" value={credentials.email}
                onChange={({ target }) => setCredentials({ ...credentials, email: target.value })}/>
            </div>
            <br/>
            <div>
              <input required type="password" placeholder="Password" value={credentials.password}
                onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}/>
            </div>
            <br/>
            {loginError && (
          <span style={{ color: "red" }}>Invalid credentials</span>
        )}
            <button>Login</button>
          </form>
        </div>
      );
}