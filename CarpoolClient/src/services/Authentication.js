import { AsyncStorage } from 'react-native';
import { store } from '../../App';

// export const USER_KEY = 'auth-demo-key';

export const onSignIn = (USER_KEY) => AsyncStorage.setItem('token_id', USER_KEY);

export const onSignOut = () => AsyncStorage.removeItem('token_id');

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token_id')
            .then(res => {
                if (res === null || res === undefined)
                    resolve(false, null);
                else {
                    store.dispatch({type: 'CHECK_TOKEN', data: {'token_id': res}});
                    store.subscribe(() => {
                        resolve(store.getState().real_token, store.getState().user);
                    });
                }
            })
            .catch(err => reject(err));
    })
        ;
    };
