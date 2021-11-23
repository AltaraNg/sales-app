import Vue from "vue";
import Flash from "./flash";
import messageApi from "../api/messages.js";
import { get } from "./api.js";
import queryParam from "./queryParam";
import { store } from "../store/store";

/**custom made vue filters
 the argument s is the string u want to capitalize
 e i a -> element, index, array**/
Vue.filter("capitalize", s => {
  if (s) {
    s = s.replace(/_/g, " ").split(" ");
    s.forEach((e, i, a) => (a[i] = e.charAt(0).toUpperCase() + e.slice(1)));
    return s.join(" ");
  }
  return "";
});

/**the argument s is the string to be converted to slug**/
Vue.filter("slug", s => (!s ? "" : s.replace(/ /g, "_").toLowerCase()));

/**custom add Date prototype**/
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

/**return the today's date - yyyy-mm-dd;**/
Vue.prototype.$getDate = (date = new Date(), monthStartsFromZero = true) => {
  /**changes 2 to 02, 10 to 10**/
  const toTwoDigits = num => (num < 10 ? "0" + num : num);
  return (
    `${date.getFullYear()}-` +
    `${toTwoDigits(date.getMonth() + (monthStartsFromZero && 1))}-` +
    `${toTwoDigits(date.getDate())}`
  );
};

//this is used to round down an amount to the nearest hundred
Vue.prototype.$roundDownAmt = amount => Math.floor(amount / 100) * 100;

/**return the network status(true | false) of the system if connected to a
 network not NB: this doesn't work with internet access. it only
 detects the system is connected to a network**/
Vue.prototype.$network = () =>
  process.env.NODE_ENV === "development" ? true : window.navigator.onLine;

/**currency formatter**/
const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2
});
Vue.prototype.$formatCurrency = price =>
  price ? formatter.format(price) : price;

/**throws custom error messages**/
Vue.prototype.$networkErr = function(err = "", duration = 30000, msg = null) {
  this.$LIPS(false);
  if (!msg) msg = "No network access, try again later!";
  if (err === "form")
    msg = "Please ensure all the fields are filled correctly!";
  if (err === "page") {
    msg = "You do not have access to that page!";
    this.$router.push("/home");
  }
  if (err === "edit")
    msg =
      "You do not have access to edit details because it is out of your jurisdiction!";
  if (err === "unique")
    msg =
      "Your details contains a unique field that already exists in our record change it and try again!";
  Flash.setError(msg, duration);
};

/**used in any form to avoid submitting forms more than
 * once or repeatedly while processing already**/
Vue.prototype.$isProcessing = false;

/**sets the loader and isProcessing to what us true or false**/
/**sets the loader and isProcessing to what us true or false**/
Vue.prototype.$LIPS = function(s) {
  //s is a boolean
  // this.$store.state.loader = this.$isProcessing = s;
  this.$isProcessing = s;
  // TODO:: cleanup
  store.dispatch("toggleLoader", s);
};

Vue.prototype.$displayErrorMessage = function(error) {
  this.$networkErr(null, 50000, error);
};

/**convert a time in 24 hours format to 12 hours format**/
Vue.prototype.$timeConvert = time => {
  // Check correct time format and split into components
  if (time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
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

Vue.prototype.$getColumn = i => {
  let column = null;
  switch (i) {
    case 1:
      column = i + "st";
      break;
    case 2:
      column = i + "nd";
      break;
    case 3:
      column = i + "rd";
      break;
    default:
      column = i + "th";
      break;
  }
  return column;
};

Vue.prototype.$setCookie = (cName, cValue) => {
  let date = new Date();
  date.setUTCHours(23, 59, 59, 999);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + ";" + expires + "; path=/";
};

Vue.prototype.$getCookie = cName => {
  var dc = document.cookie;
  var prefix = cName + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
};

// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.

Vue.prototype.$getCookieValue = name => {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return value != null ? unescape(value[1]) : null;
};

Vue.prototype.$prepareNotifications = () => {
  let userId = localStorage.getItem("user_id");
  const query = {
    limit: 100,
    receiver: userId,
    unread: true
  };

  messageApi
    .index(queryParam(query))
    .then(r => store.dispatch("mutateNotifications", r.data.data.data));
};

Vue.prototype.$prepareInactiveProspects = () => {
  const query = {
    inActiveDays: 30
  };
  !store.getters.inactiveProspects &&
    get("/api/inactive/prospects" + queryParam(query)).then(r =>
      store.dispatch("mutateInactiveProspects", r.data.data.meta.total)
    );
};

Vue.prototype.$mobileCheck = function() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
