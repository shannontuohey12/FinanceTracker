
const Home = () => {
    return (
        <div>
            <h1>⋅˚₊‧ Welcome to Finance Tracker! ‧₊˚ ⋅</h1>
            <p>Easily log in or create an account, then begin to track your finances! Keep on top of all your spending habits.</p>
            <div className="button-container">
                <button className="btn login-btn" onClick={() => window.location.href = '/login'}>Login</button>
                <button className="btn register-btn" onClick={() => window.location.href = '/register'}>Register</button>
            </div>
            <br></br>
            <br></br>

        </div>
    );
}

export default Home;