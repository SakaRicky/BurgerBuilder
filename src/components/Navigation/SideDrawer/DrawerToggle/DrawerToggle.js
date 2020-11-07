import React from 'react';

import Logo from '../../../Logo/Logo';
import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => {
    return(
        <div className={classes.Logo} onClick={props.clickedToggle}>
            <Logo />
        </div>
    );
}

export default drawerToggle;