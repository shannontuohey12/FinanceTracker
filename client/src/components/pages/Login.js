import { fetchData } from "../../main.js";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    
    const { email, password } = user;

    const onChange = (e) => setUser({...user, [e.target.name]:e.target.value});

    const onSubmit =  (e) => {
        e.preventDefault();
        // Handle form submission logic here

        fetchData("user/login", user, "POST")
        .then((data)=>{
            if(!data.message){
                localStorage.setItem("loggedInUser", JSON.stringify(data));
                navigate("/profile")
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    return(
        <div>
            <h1>. ݁₊ ⊹ . ݁ Login ݁ . ⊹ ₊ ݁.</h1>
            <form onSubmit={onSubmit}>
                <div className = "mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        required 
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        value={email}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className = "mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        required
                        onChange={onChange}
                        value={password}
                    />
                </div>
                <button type="submit" className="btn login-btn">Submit</button>

            </form>
            <br></br>
            <br></br>
        </div>
    )}

    export default Login;