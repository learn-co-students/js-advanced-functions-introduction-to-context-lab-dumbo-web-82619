function createEmployeeRecord(e) {
    e.firstName = e[0]
    e.familyName = e[1]
    e.title = e[2]
    e.payPerHour = e[3]
    e.timeInEvents = []
    e.timeOutEvents = []
    return e
}

function createEmployeeRecords(employees) {
    let records = employees.map(e => createEmployeeRecord(e))
    return records
}

function createTimeInEvent(r, time) {
    let timeIn = {}
    timeIn.type = "TimeIn"
    timeIn.date = time.split(' ')[0]
    timeIn.hour = parseInt(time.split(' ')[1])
    r.timeInEvents.push(timeIn)
    return r
}

function createTimeOutEvent(r, time) {
    let timeOut = {}
    timeOut.type = "TimeOut"
    timeOut.date = time.split(' ')[0]
    timeOut.hour = parseInt(time.split(' ')[1])
    r.timeOutEvents.push(timeOut)
    return r
}

function hoursWorkedOnDate(r, date) {
    let timeIn = r.timeInEvents.find(e => e.date === date)
    let timeOut = r.timeOutEvents.find(e => e.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(r, date) {
    return r.payPerHour * hoursWorkedOnDate(r, date)
}

function allWagesFor(e) {
    let wages = e.timeOutEvents.map(t => wagesEarnedOnDate(e, t.date))
    return wages.reduce((w, t) => w + t)
}

function calculatePayroll(employees) {
    let wages = employees.map(e => allWagesFor(e))
    return wages.reduce((w, t) => w + t)
}

function findEmployeeByFirstName(r, name) {
    return r.find( e => e.firstName === name)
}