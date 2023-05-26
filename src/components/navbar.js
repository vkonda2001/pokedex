import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './navbar.scss'

function App({navTitle}){
    return (
        <div id = 'nav-container'>
            <h1 className='nav-title'>{navTitle}</h1>
            <Link className='nav-button' to='/' id='home-button'>Search</Link>
            <Link className='nav-button' to='/gallery' id = 'gallery'>Gallery</Link>
        </div>
    );
}

App.proptype = {
    navTitle : PropTypes.string.isRequired
}

export default App;