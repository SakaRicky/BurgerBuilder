import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.navigationItems}>
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem>CheckOut</NavigationItem>

    </ul>
);

export default navigationItems;