import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <h1>
                <Link className='header' to="/transactions">Budget App</Link>
            </h1>
            <Link id='new-link' to="/transactions/new">NEW TRANSACTION</Link>
        </div>
    );
};

export default Navbar;