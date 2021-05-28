import { AsyncStorage, Platform } from 'react-native';
import { store } from '../App';

const SUCCESS = 200;

const root = '/';
const dash = '/';

const join = (d, ...ds) =>
    ds.length === 0 ? d :
        d[0] === root ? `${ d }${ join(ds) }` : [d].concat(ds).join(dash);


const API = Platform.OS === 'android'
    ? 'http://192.168.0.9:5000/v1' : 'http://localhost:5000/v1';
const resources = join(API, 'resources');

const concat = (a, b) => Object.assign({}, a, b);

const postHandler = (store, next, action) => {
    return (url, success, fail) => {
        store.dispatch({type: 'LOADING'});
        fetch(join(resources, url), {
            method: 'POST',
            body: JSON.stringify(action.data),
        }).then(response => response.json())
            .then(data => {
                return next({type: success, data});
            })
            .catch(error => {
                console.log('error post!: ', error);
                return next({type: fail, error});
            });
    };
};
const getUserHandler = (store, next, email) => {
    store.dispatch({type: 'LOADING'});
    fetch(`${ API }/resources/users?id=${ email }`, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
        .then(response => {console.log("response: ", response); return response.json();}).then(data => {console.log("data:", data); return next({
        type: 'GET_USER_SUCCESS',
        data,
    })})
        .catch(error => {
            console.log('2error!: ', error);
            return next({
                type: 'ERROR',
                error,
            });
        });
};

// const getGroupHandler = (store, next, id) => {
//     store.dispatch({type: 'LOADING'});
//     fetch(`${ API }/resources/groups?id=${ id }`, {
//         method: 'GET',
//         headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
//     })
//         .then(response => response.json()).then(data => next({
//         type: 'GET_GROUP_SUCCESS',
//         data,
//     }))
//         .catch(error => {
//             console.log('error! get group handler: ', error);
//             return next({
//                 type: 'ERROR',
//                 error,
//             });
//         });
// };

const findGroupsHandler = (store, next, email, daytimes) => {
    store.dispatch({type: 'LOADING'});
    fetch(`${ API }/actions/find_groups?email=${ email }&morning=${daytimes["morning"]}&evening=${daytimes["evening"]}`, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
        .then(response => {console.log("res: ", response); return response.json()}).then(data => next({
        type: 'FIND_GROUPS_SUCCESS',
        data,
    }))
        .catch(error => {
            console.log('error!: find group', error);
            return next({
                type: 'ERROR',
                error,
            });
        });
};

const removeUserFromGroupHandler = (store, next, data) => {
    email = data['email'];
    group_id = data['group_id'];
    store.dispatch({type: 'LOADING'});
    fetch(`${ API }/actions/remove_from_group?email=${ email }&group_id=${group_id}`, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
        .then(response => response.json()).then(data => next({
        type: 'REMOVE_FROM_GROUP_SUCCESS',
        data,
    }))
        .catch(error => {
            console.log('error!: remove user from group', error);
            return next({
                type: 'ERROR',
                error,
            });
        });
};

const findRealTimeGroupsHandler = (store, next, data) => {
    store.dispatch({type: 'LOADING'});
    fetch(`${ API }/actions/find_real_time_groups`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(response => {
        let x = response.json();
        return x;
    }).then(data => next({
        type: 'FIND_REAL_TIME_GROUPS_SUCCESS',
        data,
    }))
        .catch(error => {
            console.log('error real time find group: ', error);
            return next({
                type: 'ERROR',
                error,
            });
        });
};
const saveUserHandler = (store, next, action) => {
    store.dispatch({type: 'LOADING'});
    fetch(`${ API }/resources/users/signup`, {
        method: 'POST',
        body: JSON.stringify(action.data),
    }).then(response => response.json())
        .then(data => {
            return next({
                type: 'SAVE_USER_SUCCESS',
                data,
            });
        })
        .catch(error => {
            console.log('error!: ', error);
            return next({
                type: 'ERROR',
                error,
            });
        });
};
const getWorkplacesHandler = (store, next) => {
    store.dispatch({type: 'LOADING'});
    fetch(`${ API }/resources/companies/justice_il`, {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
        .then(response => response.json()).then(data => {
        return next({
            type: 'GET_WORK_PLACES_SUCCESS',
            data,
        });
    })
        .catch(error => {
            console.log('error!:  getWorkPlace', error);
            return next({
                type: 'ERROR',
                error,
            });
        });
};
// const loginHandler = (store, next, action) => {
//     store.dispatch({type: 'LOADING'});
//     fetch(`${ API }/resources/users/login`, {
//         method: 'POST',
//         body: JSON.stringify(action.data),
//     }).then(response => response.json())
//         .then(data => {
//             return next({
//                 type: 'LOG_IN_SUCCESS',
//                 data,
//             });
//         })
//         .catch(error => {
//             console.log('error!: ', error);
//             return next({
//                 type: 'ERROR',
//                 error,
//             });
//         });
// };
// const checkTokenHandler = (store, next, action) => {
//     return postHandler();
// };

const requests = (store, next, action) => {
    const poster = postHandler(store, next, action);
    const error = 'ERROR';
    return {
        'GET_USER': () => getUserHandler(store, next, action.data['id']),
        'SAVE_USER': () => poster(join('users', 'signup'), 'SAVE_USER_SUCCESS', error),
        'LOG_IN': () => poster(join('users', 'login'), 'LOG_IN_SUCCESS', error),
        'GET_WORK_PLACES': () => getWorkplacesHandler(store, next),
        'CHECK_TOKEN': () => poster(join('users', 'token'), 'CHECK_TOKEN_SUCCESS', 'CHECK_TOKEN_FAIL'),
        // 'GET_GROUP': () => getGroupHandler(store, next, action.data['id']),
        'FIND_GROUPS': () => findGroupsHandler(store, next, action.data['email'], action.data['daytimes']),
        'REMOVE_USER_FROM_GROUP': () => removeUserFromGroupHandler(store, next, action.data),
        'FIND_REAL_TIME_GROUPS': () => findRealTimeGroupsHandler(store, next, action.data),
    };
};


//asks the server for response
export const apiMiddleware = store => next => action => {
    // Pass all requests through by default
    next(action);
    let request = requests(store, next, action)[action.type];
    if (request !== undefined) {
        request();
    }
};

//responsible for the client state (recieves state and action and returns a new state)
export const reducer = (state = {
    loading: true,
    user: {},
    work_places: [],
    email: '',
    real_token: false,
    logged: false,
    searched_first_group: 0,
    group_schedule: undefined,
    morning_group: undefined,
    evening_group: undefined,
    groups_suggestions: [],
    got_data: false
}, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,                   // keep the existing state,
                loading: true,              // but change loading to true
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                loading: false,             // set loading to false
                user: action.data.user, // update movies array with reponse data
                group_schedule: action.data.group_schedule,
                got_data: true,
            };
        // case 'GET_GROUP_SUCCESS':
        //     return {
        //         ...state,
        //         loading: false,
        //         group: action.data,
        //     };
        case 'FIND_GROUPS_SUCCESS':
            return {
                ...state,
                loading: false,
                searched_first_group: state.searched_first_group ? state.searched_first_group + 1 : 1,
                group_schedule: action.data['group_schedule'],
                morning_group: action.data['morning_group'],
                evening_group: action.data['evening_group'],
                user: {...state.user, group_schedule: action.data['user_schedule']},

            };
        case 'REMOVE_FROM_GROUP_SUCCESS':
            console.log("user schedule:", action.data['user_schedule']);
            return {
                ...state,
                loading: false,
                group_schedule: action.data['group_schedule'],
                user: {...state.user, group_schedule: action.data['user_schedule']},
            };
        case 'FIND_REAL_TIME_GROUPS_SUCCESS':
            return {
                ...state,
                loading: false,
                groups_suggestions: action.data, //JSON.parse(action.data)
            };
        case 'SAVE_USER_SUCCESS':
            return {
                ...state,
                logged: true,
                token: `${ action.data['token_id'] }`,
                // group: `${action.data['group_id']}`,
                loading: false,             // set loading to false
            };

        case 'SAVE_EMAIL': {
            return {
                ...state,
                loading: false,
                email: action.email,
            };
        }
        case 'CHECK_TOKEN_SUCCESS':
            const res = action.data['response'];
            return {
                ...state,
                real_token: res !== '',
                user: res,
                loading: false,
            };

        case 'CHECK_TOKEN_FAIL':
            return {
                ...state,
                real_token: false,
                user: action.data,
                loading: false,
            };

        case 'GET_WORK_PLACES_SUCCESS':
            return {
                ...state,
                loading: false,             // set loading to false
                work_places: action.data, // update movies array with reponse data
            };
        // case 'UPDATE_SCHEDULE':
        //     let updatedUser = state.user;
        //     let updatedSchedule = state.group_schedule;
        //     updatedUser['group_schedule'][action.day][action.daytime] = -1;
        //     updatedSchedule[action.day][action.daytime] = -1;
        //     console.log("updated user", updatedUser);
        //     return {
        //         ...state,
        //         user: updatedUser,
        //         group_schedule: updatedSchedule,  
        //     }
        case 'ERROR':
            console.log(action.error);
            return state;
        default:
            return state;
    }
};
