import React from 'react';
import './styles.css';
import logoNetflix from '../../assets/images/logo_netflix.svg';
import userNetflix from '../../assets/images/avatar.png';

const Header = ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href='./'> <img src={logoNetflix} alt='' /> </a>
            </div>
            <div className='header--user'>
                <a href='./'> <img src={userNetflix} alt='' /> </a>
            </div>
        </header>
    );
}

export default Header;
