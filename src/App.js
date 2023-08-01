import React, { useReducer } from 'react';
import classes from './App.module.css'
import DigitButton from './components/digiButton';
import OpButton from './components/opButton';

export const ACTIONS = {
  ADD_DIGITS: 'addDigits',
  CLEAR: 'Clear',
  CHOSE_OPERATION: 'ChooseOperation',
  EVALUATE_OPERATION: 'EventuateOperation',
  DELETE_DIGIT: 'DeleteDigit'
}

function evaluate({currentOp, previousOp, operation}) {
  console.log();
  const previous = parseFloat(previousOp)
  const current = parseFloat(currentOp)
  if (isNaN(previous) || isNaN(current)) return ''
  let computation = ''
  switch (operation) {
    case '+':
      computation = previous + current
      break
    case '-':
      computation = previous - current
      break
    case '/':
      computation = previous / current
      break
    case '*':
      computation = previous * current
      break
    case '%':
      computation = previous % current
      break
  }
  return computation.toString()
}


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if(state.overwrite === true) {
        return{
          ...state,
          currentOp:payload.digit,
          overwrite:false
        }
      }
      if (payload.digit === '0' && state.currentOp === '0') return state
      if (payload.digit === '.' && state.currentOp.includes('.')) return state

      return {
        ...state,
        currentOp: `${state.currentOp || ''}${payload.digit}`,
      }
    case ACTIONS.CHOSE_OPERATION:
      if (state.currentOp === undefined && state.previousOp === undefined) return state

      if (state.previousOp === undefined) return {
        ...state,
        operation: payload.operation,
        previousOp: state.currentOp,
        currentOp: undefined
      }
      if (state.currentOp === undefined) return {
        ...state,
        operation: payload.operation,
      }
      // if (state.currentOp !== undefined && state.operation !== undefined || state.operation !== null) return {
      //   ...state,
      //   operation: payload.operation,
      // }


      return {
        ...state,
        previousOp: evaluate(state),
        operation: payload.operation,
        currentOp: null,
      }
      case ACTIONS.EVALUATE_OPERATION:
        if (state.currentOp === undefined || state.previousOp === undefined || state.operation === null){
          return{
            state
          }

        }
        return{
          ...state,
          overwrite: true,
          previousOp:undefined,
          currentOp: evaluate(state),
          operation: undefined,
        }


    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite ){
        return{
          ...state,
          overwrite: false,
          currentOp:undefined,
        }
      }
      if(state.currentOp === undefined ){return{
        state
      }}
      if(state.currentOp.length === 1){return{
          ...state,
          currentOp:undefined,
        }
      }
      return{
        ...state,
        currentOp:state.currentOp.slice(0, -1)
      }

    }
    
  }
  
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  function formatOperand(operand) {
    if (operand == undefined) return
    const [integer, decimal] = operand.split(".")
    if (decimal == undefined) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

function App() {

  const [{ currentOp, previousOp, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className={classes.calc_wrapper}>
      <div className={classes.calculator}>
        <div className={classes.output}>
          <div className={classes.previous_op}>{formatOperand(previousOp)}{operation}</div>
          <div className={classes.current_op}>{formatOperand(currentOp)}</div>
        </div>

        <div className={classes.button_wrapper}>
          <button onClick={() => { dispatch({ type: ACTIONS.CLEAR }) }} className={classes.span_two} >AC</button>
        </div>
        <div className={classes.button_wrapper}>
          <button onClick={() => { }} >()</button>
        </div>

        <OpButton dispatch={dispatch} operation='%' />

        <OpButton dispatch={dispatch} operation='+' />
        <DigitButton dispatch={dispatch} digit='1' />
        <DigitButton dispatch={dispatch} digit='2' />
        <DigitButton dispatch={dispatch} digit='3' />
        <OpButton dispatch={dispatch} operation='-' />
        <DigitButton dispatch={dispatch} digit='4' />
        <DigitButton dispatch={dispatch} digit='5' />
        <DigitButton dispatch={dispatch} digit='6' />
        <OpButton dispatch={dispatch} operation='*' />
        <DigitButton dispatch={dispatch} digit='7' />
        <DigitButton dispatch={dispatch} digit='8' />
        <DigitButton dispatch={dispatch} digit='9' />
        <OpButton dispatch={dispatch} operation='/' />

        <DigitButton dispatch={dispatch} digit='.' />

        <DigitButton dispatch={dispatch} digit='0' />

        <div className={classes.button_wrapper}>
          <button onClick={() => {dispatch({type:ACTIONS.DELETE_DIGIT}) }} >DEL</button>
        </div>
        <div className={classes.button_wrapper}>
          <button onClick={() => {dispatch({type:ACTIONS.EVALUATE_OPERATION, payload:'='})}} className={classes.span_two} >=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
