import moment from "moment";
const StaticObjectMaker = {
  calendar: ({ month, year, type, return_type }) => {
    let end = 12;
    if (type === "days") {
      end = moment(`${year}-${month}`, "YYYY-M").daysInMonth();
    }
    const obj = {};
    const array = [];
    for (let i = 1; i <= end; i++) {
      let date = `${year}-${month}-${i}`;

      let key = moment(date).format("YYYY-MM-DD");
      if (type === "month") {
        date = `${year}-${i}`;
        console.log(date, "<<")
        key = moment(date).format("MMM YYYY");
      }
      obj[key] = 0;
      array.push({ date: key });
    }
    return return_type === "object"
      ? obj
      : array
  }

}
export default StaticObjectMaker