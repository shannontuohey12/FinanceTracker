import { useEffect, useState } from "react";
import { fetchData } from "../../main.js";

const Profile = () => {
    const [user] = useState(() => {
        const storedUser = localStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : { firstName: "", lastName: "", _id: "" };
    });
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (user._id) {
            fetchData("transaction/user", { userId: user._id }, "POST")
                .then((data) => setTransactions(data))
                .catch((error) => console.log(error));
        }
    }, [user._id]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const transactionData = {
            amount: formData.get("amount"),
            date: formData.get("date"),
            location: formData.get("location"),
            userId: user._id
        };

        fetchData("transaction/create", transactionData, "POST")
            .then((data) => {
                setTransactions([...transactions, data]);
                e.target.reset(); // Clear the form after submission
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <h1>⊹₊˚‧︵‿₊ᰔ Hello, {user.firstName}! ᰔ₊‿︵‧˚₊⊹</h1>
            <p>Welcome to your profile page. Here you can view all of your transactions and create new transactions!</p>
            <h2>Create a New Transaction</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="text" className="form-control" id="date" name="date" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" />
                </div>
                <button type="submit" className="btn login-btn">Submit</button>
            </form>
            <h2>Transaction History</h2>
            <div className="transaction-history">
                {transactions.length === 0 ? (
                    <p>No transactions yet.</p>
                ) : (
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction._id}>
                                {transaction.date} ⟡ ${transaction.amount} ⟡ {transaction.location} ⟡ {transaction.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <br></br>
            <br></br>
        </div>
    );
}

export default Profile;