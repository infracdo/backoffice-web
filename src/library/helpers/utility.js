import { Map } from 'immutable';
import moment from 'moment';
export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function arrayEqual(array1, array2) {
  return array1.sort().toString() === array2.sort().toString();
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = (number) => {
    return number > 1 ? 's' : '';
  };
  const number = (num) => (num > 9 ? '' + num : '0' + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }
  return defValue;
}
export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}
export function valueType(value, type) {
  if (!value && value !== 0) {
    return type === "currency" ? "₱0.00" : "-"
  }
  switch (type) {
    case "percent":
      return value + "%"
    case "currency":
      if (typeof value === "string") {
        const withoutCommas = value?.replace(/,/g, ''); // Remove commas
        value = parseFloat(withoutCommas); // Convert to float
      }
      return "₱" + Number(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    default:
      return Number(value).toLocaleString()
  }
}
export function dateFormat(date, format = "ll") {
  if (!date || date === "None") {
    return "-";
  }
  //example value Oct 07, 2022
  return moment(date).format(format);
}

export function toTitleCase(phrase) {
  return phrase
    .replace("_", " ")
    .toLowerCase()
    .split(" ")
    .map(word =>
      word.charAt(0) === "("
        ? word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2)
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function formatDate(value) {
  if(value) {
    return moment(value).format('MMM DD, YYYY hh:mm A')
  } else {
    return '-'
  }
 }

 export function amountFormat(value) {
  const amount = value ? value : 0;
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function numberFormat(value) {
  return value.toLocaleString();
}

export function sortOptions(list) {
  return list.sort((a, b) => a.props.children.localeCompare(b.props.children));
}

export function formatKilobytes(kb) {
  if (kb === 0) return "0 KB";

  const units = ["KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(kb) / Math.log(k));  // auto-pick unit
  const value = kb / Math.pow(k, i);

  return `${value.toFixed(2)} ${units[i]}`;
}