import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSidedrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSidedrawer: !prevState.showSidedrawer}
        });
    }
    
    render() {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSidedrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
    
};

export default Layout;