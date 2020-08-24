import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>TotalPrice: {props.price}</p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.added(ctrl.type)}
            removed={() => props.removed(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        ))}
    </div>
);

export default buildControls;