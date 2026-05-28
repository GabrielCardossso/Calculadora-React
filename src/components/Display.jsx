import React from 'react';
import './Display.css';

const MAX_DECIMALS = 5

function formatValue(value) {
    if (value === null || value === undefined) return '0'

    const num = typeof value === 'number' ? value : parseFloat(String(value))

    if (Number.isNaN(num)) return String(value)

    const rounded = Number(num.toFixed(MAX_DECIMALS))
    if (Object.is(rounded, -0)) return '0'
    if (Number.isInteger(rounded)) return String(rounded)

    return rounded.toFixed(MAX_DECIMALS).replace(/\.?0+$/, '')
}

export default props => {
    return (
        <div className="display">{formatValue(props.value)}</div>
    );
}
