import React from 'react';
import classes from '../NavigationItems/NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/order">Orders</NavigationItem>
    </ul>
);

export default navigationItems;