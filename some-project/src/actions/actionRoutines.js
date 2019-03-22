import camelCase from 'lodash/fp/camelCase';
import { getTypeOf } from '../utils/helpers';



export const actionTypes = [
    'MAYBE_TRIGGER',
    'TRIGGER',
    'REQUEST',
    'SUCCESS',
    'FAILURE',
    'FULFILL'
];

export const ROUTINE_PROMISE = 'actions/ROUTINE_PROMISE';

/**
 * createRoutine(string: routineName)
 *
 * Creates an object with the standard action creators and constants.
 *
 * For example:
 * const myAction = createRoutine('ACTION')
 *
 * myAction === {
 *   // the standard action constants:
 *   MAYBE_TRIGGER: 'ACTION_MAYBE_TRIGGER',
 *   TRIGGER: 'ACTION_TRIGGER',
 *   REQUEST: 'ACTION_REQUEST',
 *   SUCCESS: 'ACTION_SUCCESS',
 *   FAILURE: 'ACTION_FAILURE',
 *   FULFILL: 'ACTION_FULFILL',
 *
 *   // the standard action creators:
 *   maybeTrigger: (payload) => ({ type: 'ACTION_MAYBE_TRIGGER', payload }),
 *   trigger: (payload) => ({ type: 'ACTION_TRIGGER', payload }),
 *   request: (payload) => ({ type: 'ACTION_REQUEST', payload }),
 *   success: (payload) => ({ type: 'ACTION_SUCCESS', payload }),
 *   failure: (payload) => ({ type: 'ACTION_FAILURE', payload }),
 *   fulfill: (payload) => ({ type: 'ACTION_FULFILL', payload }),
 * }
 */
export function createRoutine(routineName) {
    const routine = actionTypes.reduce((routine, actionType) => {
        const actionName = `${routineName}_${actionType}`;
        routine[actionType] = actionName;
        routine[camelCase(actionType)] = payload => ({
            type: actionName,
            payload
        });
        return routine;
    }, {});

    const routinePromise = (data, dispatch) => {
        return new Promise((resolve, reject) => dispatch({
            type: ROUTINE_PROMISE,
            payload: {
                data,
                routine,
                defer: {
                    resolve,
                    reject
                }
            }
        }));
    };

    return Object.assign(routinePromise, routine);
}

/**
 * bindRoutineCreators(object: routines, fn: dispatch)
 *
 * Like redux's bindActionCreators, except it takes an object of routines
 * created by createRoutine instead of an object of individual action creators
 *
 * For example, using myAction from above:
 * const boundRoutines = bindRoutineCreators({ myAction }, dispatch)
 *
 * boundRoutines === {
 *   myAction: {
 *     maybeTrigger: (payload) => dispatch(myAction.maybeTrigger(payload)),
 *     trigger: (payload) => dispatch(myAction.trigger(payload)),
 *     request: (payload) => dispatch(myAction.request(payload)),
 *     success: (payload) => dispatch(myAction.success(payload)),
 *     failure: (payload) => dispatch(myAction.failure(payload)),
 *     fulfill: (payload) => dispatch(myAction.fulfill(payload)),
 *   },
 * }
 */
export function bindRoutineCreators(routines, dispatch) {
    if (getTypeOf(routines) !== 'object') {
        throw new Error('routines must be an object');
    }
    if (getTypeOf(dispatch) !== 'function') {
        throw new Error('dispatch must be a function');
    }

    return Object.keys(routines).reduce((boundRoutines, routineName) => {
        boundRoutines[routineName] = _bindRoutine(routines[routineName], dispatch);
        return boundRoutines;
    }, {});
}

function _bindRoutine(routine, dispatch) {
    if (!Object.keys(routine).length || actionTypes.indexOf(Object.keys(routine)[0]) === -1) {
        return payload => dispatch(routine(payload));
    }

    return actionTypes.reduce((boundRoutine, actionType) => {
        const key = camelCase(actionType);
        boundRoutine[key] = payload => dispatch(routine[key](payload));
        return boundRoutine;
    }, {});
}



/**
 * mapRoutineCreators(object: routines)
 *
 * Use this helper function to pass routines to the redux connect function
 *
 * For example:
 * connect(mapStateToiProps, mapRoutineCreators({myAction}))
 */
export const mapRoutineCreators = (routine = {}) => (dispatch) => bindRoutineCreators(routine, dispatch);
