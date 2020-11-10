import React, { Component } from 'react';

import classes from './Modal.module.css';
import Auxilary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    componentDidUpdate () {
        console.log('[Modal] updated');
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.show !== this.props.show) {
            return true;
        } else {
            return false;
        }
    }

    render () {
        return (
            <Auxilary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </Auxilary>
        );
    }
}

export default Modal;