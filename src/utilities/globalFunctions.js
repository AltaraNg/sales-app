import Vue from 'vue';
import Flash from './flash';
import { store } from '../store/store';

/**custom made vue filters
 the argument s is the string u want to capitalize
 e i a -> element, index, array**/
Vue.filter('capitalize', s => {
    if (s) {
        s = (s.replace(/_/g, ' ').split(" "));
        s.forEach((e, i, a) => a[i] = e.charAt(0).toUpperCase() + e.slice(1));
        return s.join(' ');
    }
    return '';
});


/**the argument s is the string to be converted to slug**/
Vue.filter('slug', s => !s ? '' : s.replace(/ /g, '_').toLowerCase());


/**custom add Date prototype**/
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};


/**return the today's date - yyyy-mm-dd;**/
Vue.prototype.$getDate = (date = new Date(), monthStartsFromZero = true) => {
    /**changes 2 to 02, 10 to 10**/
    const toTwoDigits = num => num < 10 ? '0' + num : num;
    return `${date.getFullYear()}-` +
        `${toTwoDigits((date.getMonth() + (monthStartsFromZero && 1)))}-` +
        `${toTwoDigits(date.getDate())}`;
};

//this is used to round down an amount to the nearest hundred
Vue.prototype.$roundDownAmt = amount => (Math.floor(amount / 100) * 100);

/**return the network status(true | false) of the system if connected to a
 network not NB: this doesn't work with internet access. it only
 detects the system is connected to a network**/
Vue.prototype.$network = () => process.env.NODE_ENV === 'development' ? true : window.navigator.onLine;


/**currency formatter**/
// const formatter = (new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }));
// Vue.prototype.$formatCurrency = price => !!price ? formatter.format(price) : price;


/**throws custom error messages**/
Vue.prototype.$networkErr = function(err = '', duration = 30000, msg = null) {
    this.$LIPS(false);
    if (!msg) msg = 'No network access, try again later!';
    if (err === 'form') msg = 'Please ensure all the fields are filled correctly!';
    if (err === 'page') {
        msg = 'You do not have access to that page!';
        this.$router.push('/home');
    }
    if (err === 'edit') msg = 'You do not have access to edit details because it is out of your jurisdiction!';
    if (err === 'unique') msg = 'Your details contains a unique field that already exists in our record change it and try again!';
    Flash.setError(msg, duration);
};

/**used in any form to avoid submitting forms more than
 * once or repeatedly while processing already**/
Vue.prototype.$isProcessing = false;

/**sets the loader and isProcessing to what us true or false**/
/**sets the loader and isProcessing to what us true or false**/
Vue.prototype.$LIPS = function(s) { //s is a boolean
    // this.$store.state.loader = this.$isProcessing = s;
    this.$isProcessing = s;
    // TODO:: cleanup
    store.dispatch('toggleLoader', s);
};

Vue.prototype.$displayErrorMessage = function(error) {
    this.$networkErr(null, 50000, error)
};


/**convert a time in 24 hours format to 12 hours format**/
Vue.prototype.$timeConvert = time => {
    // Check correct time format and split into components
    if (time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    return time;
};

Vue.prototype.$dateTimeConvert = function(dateTime) {
    let [date, time] = dateTime.split(" ");
    return date + "  " + this.$timeConvert(time);
};

Vue.prototype.$debounce = (func, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};


Vue.prototype.$getColumn = (i) => {
    let column = null;
    switch (i) {
        case 1:
            column = i + 'st';
            break;
        case 2:
            column = i + 'nd';
            break;
        case 3:
            column = i + 'rd';
            break;
        default:
            column = i + 'th';
            break;
    }
    return column;
};