import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';
import dimensions from './dimensions';


export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    full: {
        backgroundColor: colors.menuButton,
        width: width, //* 0.95,
    },
    collapsible: {
        backgroundColor: colors.menuButton,
        width: width * 0.95,
    },
    screenBg: {
        backgroundColor: colors.white,
    },
    fillAll: {
        flex: 1,
    },
    withMarginBottom: {
        marginBottom: dimensions.indent,
    },
    withMarginTop: {
        marginTop: dimensions.indent,
    },
    withMarginLeft: {
        marginEnd: dimensions.indent,
    },
    withMarginRight: {
        marginEnd: dimensions.indent,
    },
    withPaddingLeft: {
        paddingStart: dimensions.indent,
    },
    withPaddingRight: {
        paddingEnd: dimensions.indent,
    },
    withVerticalMargin: {
        marginTop: dimensions.indent,
        marginBottom: dimensions.indent,
    },
    withVerticalPadding: {
        paddingTop: dimensions.indent,
        paddingBottom: dimensions.indent,
    },
    withHorizontalPadding: {
        paddingEnd: dimensions.indent,
        paddingStart: dimensions.indent,
    },
    withHorizontalMargin: {
        marginEnd: dimensions.indent,
        marginStart: dimensions.indent,
    },
    withoutMargins: {
        marginTop: 0,
        marginEnd: 0,
        marginBottom: 0,
        marginStart: 0,
    },
    withWhiteBackground: {
        backgroundColor: colors.white,
    },
    withGrayBackground: {
        backgroundColor: colors.grayBg,
    },
    withLightBackground: {
        backgroundColor: colors.athensGray,
    },
    withSecondaryTextColor: {
        color: colors.secondaryText,
    },
    withVerticalBorder: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    stickToBottom: {
        bottom: 0,
    },
    stretchHorizontally: {
        left: 0,
        right: 0,
    },
    alignedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    withoutBorders: {
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        shadowOpacity: 0,
    },
    withBorderTop: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
    },
    withBorderBottom: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    headerBg: {
        backgroundColor: colors.headerBackgroundColorDefault,
    },
    header: {
        flexDirection: 'row-reverse',
        // borderBottomEndRadius: 20,
        // borderBottomStartRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray,
        height: 60,
        marginTop: 0,
        padding: 0,
    },
    borderBottom: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.headerBorderBottom,
    },
    borderTop: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.headerBorderBottom,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.gray,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    nameText: {
        fontSize: 28,
        // fontWeight: '',
        color: 'rgb(41,132,109)',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    welcomeText: {
        fontSize: 20,
        // fontWeight: 'light',
        color: 'rgb(163,161,161)',
        alignSelf: 'center',
        paddingBottom: '10%',
        textAlign: 'center',
        width: '90%',
    },
    welcomeTitleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.gray,
        alignSelf: 'center',
        paddingTop: '10%',
        // paddingTop: 0,
    },
    welcomeImageContainer: {
        paddingTop: '20%',
        width: '100%',
        flex: 1,
    },
    welcomeImage: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        resizeMode: 'center',
        // paddingTop: '40%',
        // height: '80%',
    },
    welcomeButton: {
        height: 50,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(144,214,212)',
    },
    welcomeTouchable: {
        paddingTop: '5%',
        paddingBottom: '30%',
    },
    link: {
        fontSize: 18,
        color: 'rgb(28,99,213)',
        textDecorationLine: 'underline',
    },
    regText: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: '2%',
    },
    regTextTemp: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right', //Change
        // alignSelf: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
        // height: '100%',
        // paddingTop: '2%',
        // paddingStart: '60%',
        // paddingEnd: '5%',
        color: colors.darkGray,
    },
    regTextWhite: {
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colors.white,
    },

    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    welcomeContainer: {
        justifyContent: 'center',
        flex: 1,
        // padding: 20,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: '2%',
        backgroundColor: colors.background,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    menuContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    textInput: {
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderColor: '#333',
        padding: 8,
        margin: 10,
        width: '90%',
        // height: '7%',
        height: 50,
        alignSelf: 'center',
        // marginTop: 10,
        borderRadius: 10,
        // alignItems: 'flex-end'
    },
    button: {
        // padding: 8,
        // margin: 10,
        height: 50,
        width: 100,
        alignSelf: 'center',
        // marginTop: 20,
        // marginStart: 20,
        // marginEnd: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(144,214,212)',
    },
    button2: {
        height: '20%',
        width: '40%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: '7%',

    },
    menuButton: {
        // flex: 1,
        height: 50,
        width: '100%',
        alignSelf: 'center',
        // borderRadius: 20,
        borderTopWidth: 1,
        borderColor: colors.PressedCircle,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.menuButton,
    },
    menuCollapsed: {
        // flex: 1,
        height: 50,
        width: '100%',
        alignSelf: 'flex-start',
        // borderRadius: 20,
        // borderTopWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.menuButton,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.menuCollapsed,
    },
    menuText: {
        fontSize: 16,
        paddingEnd: '5%', //Should be start
        alignSelf: 'flex-end', //Should be start
        fontWeight: 'bold',
        color: 'rgb(0,0,0)',
    },
    menuImage: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'rgb(37,76,106)',
    },
    homeImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgb(255,255,255)',
    },
    FaceBookButton: {
        borderRadius: 10,
        backgroundColor: 'rgb(59,89,152)',
        height: 50,
        width: '80%',
        alignSelf: 'center',
        marginTop: '3%',
    },
    GoogleButton: {
        borderRadius: 10,
        backgroundColor: colors.white,
        height: 50,
        width: '80%',
        alignSelf: 'center',
        marginTop: '3%',
    },
    PickeritemStyle: {
        fontSize: 8,
        height: 35,
        color: colors.darkGray,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 42,
        height: 42,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 3,
        marginEnd: 3,
    },

    list: {
        flex: 1,
        // flexGrow: 1,
        // alignSelf: 'center',
        width: '100%',
        // padding: '1%',
        // height: '80%',
        // marginBottom: '2%',
    },
    hyphen: {
        fontWeight: 'bold',
        fontSize: 32,
        // marginTop: 20,
        color: colors.gray,
    },
    flex: {
        flex: 1,
    },
    day: {
        borderRadius: 10,
        backgroundColor: colors.white,
        height: 120,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 10,
    },
    iconStyle: {
        fontSize: 20,
        color: colors.PressedCircle,
        marginTop: 20,
    },
    line: {
        borderBottomColor: colors.darkGray,
        width: '97%',
        borderBottomWidth: 1,
    },
    modal: {
        margin: 0,
        backgroundColor: colors.pink,
        height: 100,
        flex: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderRadius: 10,
    },

    suggestionModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationButtonEnd: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    navigationButtonStart: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    navigationButtonStyle: {
        backgroundColor: colors.PressedCircle,
        borderRadius: 10,
        paddingTop: '1%',
        paddingBottom: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
        marginBottom: '10%',
    },
    image: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 150,
    },
    pickImage: {
        height: '70%',
        width: '80%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#000'
    },
    iconImage: {
        height: '50%',
        width: '8%',
        alignSelf: 'center',
        borderRadius: 20,
        marginLeft: '5%',
        marginRight: '5%',
    },
    dailyIcon: {
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: 0,
        fontSize: 18,
        color: colors.PressedCircle,
    },
    dayInfo: {
        width: '20%',
        justifyContent: 'center',
    },

    dayInfoText: {
        alignSelf: 'center',
        fontSize: 22,
        backgroundColor: colors.menuButton,
        borderRadius: 30,
        textAlign: 'center',
        width: 30,
    },

    border: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.lightGray,
    },
    padding: {
        paddingStart: '2%',
        paddingEnd: '2%',
        paddingBottom: '2%',
        paddingTop: '2%',
    },
    padding2: {
        paddingStart: '7%',
        paddingEnd: '7%',
        paddingBottom: '2%',
        paddingTop: '2%',
    },
    shadow: {
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        elevation: 3,
    },
    stepOneBottom: {
        width: '100%',// marginBottom: '10%',
        alignSelf: 'center', flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default styles;
