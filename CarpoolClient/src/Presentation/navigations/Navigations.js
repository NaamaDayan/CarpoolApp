import React from 'react';
// import { createStackNavigator } from 'react-navigation-stack';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import { createAppContainer } from '@react-navigation/';
import StepOne from '../screens/Register/StepOne';
import StepTwo from '../screens/Register/StepTwo';
import StepThree from '../screens/Register/StepThree';
import Home from '../screens/Home/Home';
import HomeSwitch from '../screens/Home/HomeSwitch';
import HomeNoGroups from '../screens/Home/HomeNoGroups';
import GroupSearch from '../screens/Home/GroupSearch';
import GroupDescription from '../screens/Groups/GroupDetails';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Profile/Settings';
import MapContainer from '../shared/MapContainer';
import HeaderBarImage from '../shared/Components/HeaderBarImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import RealTimeSearch from '../screens/RealTime/RealtimeSearch';
import Suggestions from '../screens/RealTime/Suggestions';
import LoadingSuggestions from '../screens/RealTime/LoadingSuggestions';
import NoSuggestions from '../screens/RealTime/NoSuggestions';
import Loading from '../screens/Authentication/Loading';
import Login from '../screens/Authentication/Login';
import Welcome from '../screens/Authentication/Welcome';

// const defaultNavigationOptions = signedIn =>
//     ({
//         initialRouteName: !signedIn ? 'StepOne' : 'Home',
//     });

// const screens = {
{/*    StepOne: {*/
}
{/*        screen: StepOne,*/
}
{/*        navigationOptions: {*/
}
{/*            headerTitle: () => <HeaderBarImage path={ require('../../../images/step1.png') }/>,*/
}
//         },
//     },
//     StepTwo: {
//         screen: StepTwo,
//         navigationOptions: {
//             headerTitle: () => <HeaderBarImage path={ require('../../../images/step2.png') }/>,
//         },
//     },
//     MapContainer: {
//         screen: MapContainer,
//         navigationOptions: {
//             title: 'חיפוש כתובת',
//         },
//     },
//     RealTimeSearch: {
//         screen: RealTimeSearch,
//         navigationOptions: {
//             title: 'חיפוש כתובת',
//         },
//     },
//     StepThree: {
//         screen: StepThree,
//         navigationOptions: {
//             headerTitle: () => <HeaderBarImage path={ require('../../../images/step3.png') }/>,
//
//         },
//     },
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             title: 'הנסיעות שלי',
//         },
//     }, // ,
// // Chat:{
// //     screen: Chat,
// //     navigationOptions: {
// //         title: 'הקבוצה שלי',
// //     }
// // }
//
// };


const RegisterStackScreens = (signedIn) => {
    const screens = {
        StepOne: {
            screen: StepOne,
            navigationOptions: {
                headerShown: false,
            },
        },
        StepTwo: {
            screen: StepTwo,
            navigationOptions: {
                headerShown: false,
            },
        },
        // StepTwo: {
        //     screen: StepTwo,
        //     navigationOptions: {
        //         headerTitle: () => <HeaderBarImage path={ require('../../../images/step2.png') }/>,
        //     },
        // },
        MapContainer: {
            screen: MapContainer,
            navigationOptions: {
                headerShown: false,
            },
        },
        StepThree: {
            screen: StepThree,
            navigationOptions: {
                headerShown: false,
            },
        },
        HomeNavigatorScreens: {
            screen: HomeNavigatorScreens(),
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {
        initialRouteName: 'StepOne',
    };
    return createStackNavigator(screens, options);
};

const ProfileStackScreens = () => {
    const screens = {
        Profile: {
            screen: Profile,
            navigationOptions: {
                headerShown: false,
            },
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {};
    return createStackNavigator(screens, options);
};

const RealTimeSearchStacksScreens = () => {
    const screens = {
        RealTimeSearch: {
            screen: RealTimeSearch,
            navigationOptions: {
                headerShown: false,
            },
        },
        Suggestions: {
            screen: SwitchSuggestionsLoading(),
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {};
    return createStackNavigator(screens, options);
};

const SwitchSuggestionsLoading = () => {
    const screens = {
        Suggestions: {
            screen: Suggestions,
            navigationOptions: {
                headerShown: false,
            },
        },
        NoSuggestions: {
            screen: NoSuggestions,
            navigationOptions: {
                headerShown: false,
            },
        },
        LoadingSuggestions: {
            screen: LoadingSuggestions,
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {
        initialRouteName: 'LoadingSuggestions',
    };
    return createSwitchNavigator(screens, options);
};

const HomeStackScreens = () => {
    const screens = {
        Home: {
            screen: Home,
            navigationOptions: {
                headerShown: false,
            },
        },
        GroupDescription: {
            screen: GroupDescription,
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {};
    return createStackNavigator(screens, options);
};

const HomeNavigatorScreens = () => {
    const screens = {
        SwitchHomeLoading: {
            screen: SwitchHomeLoading(),
            navigationOptions: {
                tabBarLabel: 'נסיעות',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons name="home" style={ [{color: tintColor}] } size={ 26 }/>
                ),
                activeColor: '#1d7289',
                // barStyle: {
                    // borderTopColor: '#1d7289',
                // },
            },
        },
        RealTimeSearch: {
            screen: RealTimeSearchStacksScreens(),
            navigationOptions: {
                tabBarLabel: 'חפש נסיעה',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons name="map-search" color={ tintColor } size={ 26 }/>
                ),
                activeColor: '#ea710f',
                // barStyle: {
                    // borderTopColor: '#ea710f',
                // },
            },
        },
        ProfileStackScreens: {
            screen: ProfileStackScreens(),
            navigationOptions: {
                tabBarLabel: 'פרופיל',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons name="account" color={ tintColor } size={ 26 }/>
                ),
                activeColor: '#5828bb',
            },
        },
    };
    const options = {
        initialRouteName: 'SwitchHomeLoading',
        activeColor: '#f0edf6',
        inactiveColor: colors.unPressedCircle,
        shifting: true,
        barStyle: {
            backgroundColor: '#FFFFFF',
            // borderTopWidth: 1,
            // borderTopColor: '#1d7289',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 10,
        },
    };

    return createMaterialBottomTabNavigator(screens, options);
};

const SwitchHomeLoading = () => {
    const screens = {
        HomeSwitch: {
            screen: HomeSwitch,
            navigationOptions: {
                headerShown: false,
            },
        },
        Home: {
            screen: HomeStackScreens(),
            navigationOptions: {
                headerShown: false,
            },
        },
        GroupSearch: {
            screen: GroupSearch,
            navigationOptions: {
                headerShown: false,
            },
        },
        HomeNoGroups: {
            screen: HomeNoGroups,
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {
        initialRouteName: 'HomeSwitch',
    };
    return createSwitchNavigator(screens, options);
};

const RootScreens = () => {
    const screens = {
        Loading: {
            screen: Loading,
            navigationOptions: {
                headerShown: false,
            },
        },
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                headerShown: false,
            },
        },
        Home: {
            screen: HomeNavigatorScreens(),
            navigationOptions: {
                headerShown: false,
            },
        },
        SignUp: {
            screen: RegisterStackScreens(),
            navigationOptions: {
                headerShown: false,
            },
        },
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false,
            },
        },
    };
    const options = {
        initialRouteName: 'Loading',
    };
    return createSwitchNavigator(screens, options);
};

// home stack navigator screens
export const Navigations = signedIn => RegisterStackScreens(signedIn);
// export const HomeStack = createStackNavigator(screens2, defaultNavigationOptions);
const createContainer = createAppContainer(RootScreens()); //(signedIn = false) => createAppContainer(Navigations(signedIn));
export default createContainer;
// export default createAppContainer(HomeStack);
