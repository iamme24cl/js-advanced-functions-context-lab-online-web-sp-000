/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let createEmployeeRecord = function(record) {
    let employeeRecord = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}

let createEmployeeRecords = function(records) {
    return records.map(record => {
        return createEmployeeRecord(record);
    });
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

let hoursWorkedOnDate = function(date) {
    let timeInEvent = this.timeInEvents.find(event => {
       return event.date === date;
    });
    let timeOutEvent = this.timeOutEvents.find(event => {
       return event.date === date;
    });

    return (timeOutEvent.hour - timeInEvent.hour) / 100;

}

let wagesEarnedOnDate = function(date) {
    let wagesPayable = this.payPerHour * hoursWorkedOnDate.call(this, date);
    return wagesPayable;
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(employeeRecords, firstName) {
    return employeeRecords.find(record => {
       return record.firstName === firstName;
    });
}

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(accumulator, record) {
        return accumulator + allWagesFor.call(record);
    }, 0);
}