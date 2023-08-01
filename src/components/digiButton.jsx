import { ACTIONS } from "../App"
import classes from './../App.module.css'
const DigitButton = ({ dispatch, digit }) => {
    return (
        <div className={classes.button_wrapper}>
            <button onClick={() => { dispatch({type:ACTIONS.ADD_DIGITS, payload:{digit}})}}>{digit}</button>
        </div>
    )
}
export default DigitButton