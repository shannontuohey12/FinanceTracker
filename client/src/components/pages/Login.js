const Login = () => {

    return(
        <div>
            <h1>Login</h1>
            <form>
                <div className = "mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" required aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className = "mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required/>
                </div>
                <button type="submit" className="btn login-btn">Submit</button>

            </form>
        </div>
    )}

    export default Login;