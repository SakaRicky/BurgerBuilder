import React from 'react';

import logoImage from '../../assets/images/27.1 burger-logo.png.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logoImage} alt="My Burger" />
    </div>
);

export default logo;