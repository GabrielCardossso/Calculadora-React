import React, { Component } from 'react';
import './Calculator.css';

import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

function applyOperation(a, operation, b) {
    switch (operation) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            return b !== 0 ? a / b : null
        default:
            return b
    }
}

export default class Calculator extends Component {

    state = { ...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(event) {
        const { key } = event

        if (key >= '0' && key <= '9') {
            event.preventDefault()
            this.addDigit(key)
            return
        }

        switch (key) {
            case '.':
            case ',':
                event.preventDefault()
                this.addDigit('.')
                break
            case '+':
            case '-':
            case '*':
            case '/':
                event.preventDefault()
                this.setOperation(key)
                break
            case 'Enter':
            case '=':
                event.preventDefault()
                this.setOperation('=')
                break
            case 'Escape':
            case 'Delete':
                event.preventDefault()
                this.clearMemory()
                break
            default:
                break
        }
    }

    clearMemory() {
        this.setState({ ...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            const result = applyOperation(values[0], currentOperation, values[1])
            values[0] = result !== null ? result : this.state.values[0]
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation, 
                current: equals ? 0 : 1, 
                clearDisplay: !equals, 
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return 
        }

        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        const nextState = { displayValue, clearDisplay: false }

        if (n !== '.') {
            const i = this.state.current
            const values = [...this.state.values]
            values[i] = parseFloat(displayValue)
            nextState.values = values
        }

        this.setState(nextState)
    }

    render() {
        return (
            <div className="calculator-wrapper">
                <h1 className="calculator-title">Calculadora</h1>
                <div className="calculator">
                <Display value={this.state.displayValue} />

                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
                </div>

                <footer className="calculator-footer">
                    <a
                        href="https://github.com/GabrielCardossso"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub de Gabriel Cardoso"
                    >
                        <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GabrielCardossso
                    </a>
                </footer>
            </div>
        );
    }
}