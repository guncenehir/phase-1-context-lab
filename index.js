/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, workDate) {
  const timeInEvent = employee.timeInEvents.find(
    (event) => event.date === workDate
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === workDate
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employee, workDate) {
  const hoursWorked = hoursWorkedOnDate(employee, workDate);
  const earnings = hoursWorked * employee.payPerHour;
  return earnings;
}

function allWagesFor(employee) {
  const eligibleDates = employee.timeInEvents.map((event) => event.date);
  const totalWages = eligibleDates.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employeeArray) {
  return employeeArray.reduce(
    (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
    0
  );
}

/* Your Code Here */

// Example usage:
const employeeData = [
  ["John", "Doe", "Manager", 25],
  ["Jane", "Smith", "Associate", 20],
];

const employees = createEmployeeRecords(employeeData);

createTimeInEvent(employees[0], "2023-08-14 0900");
createTimeOutEvent(employees[0], "2023-08-14 1700");
createTimeInEvent(employees[1], "2023-08-14 1000");
createTimeOutEvent(employees[1], "2023-08-14 1800");

console.log(allWagesFor(employees[0])); // Calculate wages for John Doe
console.log(allWagesFor(employees[1])); // Calculate wages for Jane Smith
console.log(calculatePayroll(employees)); // Calculate total payroll for all employees
