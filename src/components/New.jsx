import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import '../styles/new.css'

const New = () => {
    const navigate = useNavigate()

    const [newTransaction, setNewTransaction] = useState({
        "id": nanoid(4),
        "item_name": "",
        "amount": "",
        "date": "",
        "from": "",
        "category": ""
    })

    const API = import.meta.env.VITE_BASE_URL

    const handleChange = (e) => {
        console.log(e)
        setNewTransaction((prevState) => {
            return { ...prevState, [e.target.name]: e.target.name === "amount" ? parseInt(e.target.value) : e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(API, {
            method: "POST",
            body: JSON.stringify(newTransaction),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res =>res.json())
        .then(res => {
            console.log(res)
            alert("Transaction successfully added!")
            navigate("/transactions")
        })
        .catch(err => console.error(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend><h3>Add New Transaction</h3></legend>
                <label htmlFor="transaction-id">Id</label><br />
                <input
                    type="text"
                    placeholder="Id"
                    name="id"
                    value={newTransaction.id}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="transaction-item_name">Name</label><br />
                <input
                    type="text"
                    placeholder="Name"
                    name="item_name"
                    value={newTransaction.item_name}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="transaction-amount">Amount</label><br />
                <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="transaction-date">Date</label><br />
                <input
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="transaction-from">From</label><br />
                <input
                    type="text"
                    placeholder="From"
                    name="from"
                    value={newTransaction.from}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="transaction-category">Category</label><br />
                <input
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={newTransaction.category}
                    onChange={handleChange}
                />
                <br />
                <input id="submit-new" type="submit" value="submit" onClick={handleSubmit}/>
            </fieldset>
        </form>
    );
};

export default New;