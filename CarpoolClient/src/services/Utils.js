import firebase from 'firebase';

export const checkData = (user) => {
    if (user.home_address.lat === 0 && user.home_address.lng === 0)
        return 'בבקשה הוסף/י כתובת מגורים';
    if (user.home_address === '')
        return 'בבקשה הוסף/י מקום עבודה';
    return '';
};

const months = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
];

const days = [
    'ראשון',
    'שני',
    'שלישי',
    'רביעי',
    'חמישי',
    'שישי',
    'שבת'
]

export const days_db = { '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday', '5': 'Friday', '6': 'Saturday' };

export const getMonthName = (number) => {
    return months[number];
};

export const getImage = (mail) => {
    return firebase.storage().ref('ProfileImages/' + mail + '.jpg');
};

export const error = (msg) => {
    console.log('error:', msg);
};


export const getDays = (group) => {
    const schedule = group['schedule'];
    let i = 0;
    let relevantDays = [];
    Object.values(schedule).forEach(val => {
        if (val != -1)
            relevantDays.push(days[i]);
        i = i + 1;
    });
    return relevantDays.join(', ');;
};
