import { ACTIONS } from "../App"
import classes from './../App.module.css'
const OpButton = ({ dispatch,operation }) => {
    return (
        <div className={classes.button_wrapper}>
            <button onClick={() => { dispatch({type:ACTIONS.CHOSE_OPERATION, payload:{operation}})}}>{operation}</button>
        </div>
    )
}
export default OpButton