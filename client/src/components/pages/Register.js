import { fetchData } from "../../main.js";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
    });

    const { firstName, lastName, email, password, password2 } = user;

    const onChange = (e) => setUser({...user, [e.target.name]:e.target.value});

    const onSubmit =  (e) => {
        e.preventDefault();
        // Handle form submission logic here

        fetchData("user/register", user, "POST")
        .then((data)=>{
            if(!data.message){
                localStorage.setItem("loggedInUser", JSON.stringify(data));
                navigate("/profile")
            }
        })
        .catch((error)=>{
            console.log(error)
        })

        if(password !== password2) {
            console.log("Passwords do not match");
        } else {
            console.log("Success!")
        }
    };

    return(
        <div>
            <h1>⋆ ˚｡⋆♡ Register ♡⋆ ˚｡⋆</h1>
            <form onSubmit={onSubmit}>
                <div className = "mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        name="firstName" 
                        onChange={onChange}
                        value={firstName}
                        required
                    />
                </div>
                <div className = "mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        name="lastName" 
                        onChange={onChange}
                        value={lastName}
                        required
                    />
                </div>
                <div className = "mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        name="email"
                        onChange={onChange}
                        value={email}
                        required
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
                        onChange={onChange}
                        value={password}
                        required
                    />
                </div>
                <div className = "mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password2" 
                        name="password2"
                        onChange={onChange}
                        value={password2}
                        required
                    />
                </div>
                <input type="submit" className="btn login-btn" value="Register" />
            </form>
            <br></br>
            <br></br>
        </div>
    )}

    export default Register;