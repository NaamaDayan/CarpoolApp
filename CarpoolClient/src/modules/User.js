export default class User {

    constructor() {
        this.company ='justice_il'
        this.home_address = {
            lat: 0,
            lng: 0,
            address_name: 'היכן אתה גר?'
        };
        this.work_address = '';
        this.exit_hour1 = '08:00';
        this.exit_hour2 = '08:30';
        this.return_hour1 = '17:00';
        this.return_hour2 = '17:30';
        this.car_days = '1111100';
        this.first_name = '';
        this.last_name = '';
    }


    // setHomeAddress = (homeAddress) => {
    //     this.homeAddress.lat = homeAddress.region.latitude;
    //     this.homeAddress.lng = homeAddress.region.longitude;
    //     this.homeAddress.address_name = homeAddress.address;

    // };
    // setWorkAdress = (workAdress) => this.workAdress = workAdress;
    // setExitHour1 = (exitHour1) => this.exitHour1 = exitHour1;
    // setExitHour2 = (exitHour2) => this.exitHour2 = exitHour2;
    // setReturnHour1 = (returnHour1) => this.returnHour1 = returnHour1;
    // setReturnHour2 = (returnHour2) => this.returnHour2 = returnHour2;
    // setCarDays = (carStr) => this.carDays = carStr;
}
