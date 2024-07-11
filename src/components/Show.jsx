import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../styles/show.css'

const Show = () => {

    const { index } = useParams()
    const [transaction, setTransaction] = useState({})
    const API = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    const handleDelete = () => {
        fetch(`${API}/${index}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            alert("Transaction deleted")
            navigate('/transactions')
        })
        .catch(err => console.error(err))
    }

    useEffect(() =>{
        fetch(`${API}/${index}`)
        .then(res => res.json())
        .then(res => {
            setTransaction(res)
        })
        .catch(err => console.error(err))
    }, [])

    return (
        <div className='show-transaction'>
            {transaction && 
            <div>
                <h3>Transaction: {transaction.item_name}</h3>

                <p>ID: {transaction.id}</p>
                <p>Category: {transaction.category}</p>
                <p>Date: {transaction.date}</p>
                <p>Merchant: {transaction.from}</p>
                <p>Amount: ${Math.abs(transaction.amount).toFixed(2)} {transaction.amount < 0 ? <span>Withdrawn</span> : <span>Deposited</span>}</p>
               
               <div className="edit-delete">
                <Link to={`/transactions/${index}/edit`}><button id="edit-btn">Edit</button></Link>
                <button id='delete-btn' onClick={handleDelete}>Delete</button>
               </div>

            </div>
            }
            <Link id="back-btn" to="/transactions"><button>Back to All Transactions</button></Link>
        </div>
    );
};

export default Show;