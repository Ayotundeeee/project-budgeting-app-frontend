import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'

const Home = () => {
    
    const [transactions, setTransactions] = useState([])
    const API = import.meta.env.VITE_BASE_URL
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sort, setSort] = useState("default");

    useEffect(() => {

        fetch(API)
        .then(res => res.json())
        .then(res => {
            setTransactions(res)
        })
        .catch(err => console.error(err))

    }, [])

    const getTransactionsTotal = transactions.reduce((sum, trans)=> sum += trans.amount, 0)
    const getSummaries = transactions.reduce((summaries, trans)=> {
        trans.amount > 0 ? summaries[0] += trans.amount : summaries[1] += trans.amount;
        return summaries;
    },[0, 0])

    const handleTypeFilterChange = (e) => {
        setTypeFilter(e.target.value);
    }

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
    }

    const handleSortChange = (e) => {
        setSort(e.target.value);
    }



    let categories = Array.from(new Set(transactions.map(transaction => transaction.category)))

    const filterByType = (transaction) => {
        if (typeFilter === "withdrawals") {
            return transaction.amount < 0;
        } else if (typeFilter === "deposits") {
            return transaction.amount > 0;
        }
        return true;
    };
    
    const filterByCategory = (transaction) => {
        if (categoryFilter === "all") {
            return true;
        }
        return transaction.category.toLowerCase() === categoryFilter;
    };

    const filteredtransactions = transactions.filter((transaction) => filterByType(transaction))
                                .filter(transaction => filterByCategory(transaction));

    const sortedTransactions = (transactions)=>{
        let toSort = transactions;
        if(sort === ("default")){
            return transactions;
        }
        if(sort === "amount-asc"){
            return toSort.sort((a,b) => a.amount - b.amount);
        }
        if(sort === "amount-desc") {
            return toSort.sort((a, b) => b.amount - a.amount);
        }
        if(sort === "date-asc"){
            return toSort.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        if(sort === "date-desc"){
            return toSort.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }

    return (

        <div className='index-page'>
            <h1 id="list-header">Account Balance : ${getTransactionsTotal}</h1>

            <div className='filter-sort'>

                <label htmlFor="filter-by-type">Filter by Type</label>
                <select name="type-filter" id="type-filter" onChange={handleTypeFilterChange}>
                    <option value="all">All</option>
                    <option value="deposits">Deposits</option>
                    <option value="withdrawals">Withdrawals</option>
                </select>

                <label htmlFor="filter-by-category">Filter by Category</label>
                <select name="category-filter" id="category-filter" onChange={handleCategoryFilterChange}>
                    <option value="all">All Categories</option>

                    {categories.map((category, index) => (
                    <option key={index} value={category.toLowerCase()}>{category}</option>
                    ))}
                </select>

                <label htmlFor="sort">Sort by</label>
                <select name="sort" id="sort" onChange={handleSortChange}>
                    <option value="default">Select One</option>
                    <option value="date-asc">Date Ascending</option>
                    <option value="date-desc">Date Decending</option>
                    <option value="amount-asc">Amount Ascending</option>
                    <option value="amount-desc">Amount Descending</option>
                </select>
            </div>
            
            <div id='transactions-list'>
                {
                    sortedTransactions(filteredtransactions).map((transaction, i)=> {
                        return (

                        <li key={transaction.id} className='transaction'>
                                <span id='trans-date'>{new Date(transaction.date).toLocaleDateString('en-US', {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}</span>
                                <Link id='trans-link' to={`/transactions/${i}`}>{transaction.item_name}</Link>
                                <span id='trans-amount' style={{color: transaction.amount < 0 && "red"}}>{transaction.amount.toFixed(2)}</span>
                        </li>  
                )
                
            }) 
                }
            </div>
            <div className="summaries"><span>Total Deposits: {getSummaries[0]} </span><span>Total Withdrawals: {getSummaries[1]}</span></div>
       </div>
    );
};

export default Home;