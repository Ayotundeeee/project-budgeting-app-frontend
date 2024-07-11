import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/edit.css'

const Edit = () => {

    const API = import.meta.env.VITE_BASE_URL

    const [transaction, setTransaction] = useState({
        "id": "",
        "item_name": "",
        "amount": "",
        "date": "",
        "from": "",
        "category": ""
    })

    const navigate = useNavigate()
    const { index } = useParams()

    useEffect(() => {
        fetch(`${API}/${index}`)
            .then(res => res.json())
            .then(res => {
                setTransaction((prevState) => res)
            })
            .catch(err => console.log(err))
    }, [index])

    const handleChange = (e) => {
        setTransaction((prevState) => {
            return { ...prevState, [e.target.name]: e.target.name === "amount" ? parseInt(e.target.value) : e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API}/${index}`,{
            method: "PUT",
            body: JSON.stringify(transaction),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            navigate(`/transactions/${index}`)
        })
        .catch(err => console.error(err))
        
    }

    if(!transaction) return <div>Loading...</div>
    return (
        <div className="edit">
            <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Edit Transaction (ID: {transaction.id})</legend>
                <input
                    type="text"
                    placeholder="Transaction Id"
                    name="id"
                    value={transaction.id}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    placeholder="Transaction name"
                    name="item_name"
                    value={transaction.item_name}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="number"
                    placeholder="Transaction amount"
                    name="amount"
                    value={transaction.amount}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="date"
                    placeholder="Transaction Date"
                    name="date"
                    value={transaction.date}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    placeholder="Transaction Merchant"
                    name="from"
                    value={transaction.from}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    placeholder="Transaction Category"
                    name="category"
                    value={transaction.category}
                    onChange={handleChange}
                />
                <br />
                <input id="submit-edit" type="submit" value="submit" onClick={handleSubmit}/>
            </fieldset>
        </form>
            <Link id="back-to-show" to={`/transactions/${index}`}>
                <button id='back-btn'>Back</button>
            </Link>
        </div>
    );
};

export default Edit;