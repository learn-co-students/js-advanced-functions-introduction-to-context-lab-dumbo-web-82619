function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record, timeStamp) {
  let [date, hour] = timeStamp.split(' ')
  record.timeInEvents.push({
    type: 'TimeIn',
    date,
    hour: parseInt(hour, 10)
  })
  return record
}

function createTimeOutEvent(record, timeStamp) {
  let [date, hour] = timeStamp.split(' ')
  record.timeOutEvents.push({
    type: 'TimeOut',
    date,
    hour: parseInt(hour, 10)
  })
  return record
}

function hoursWorkedOnDate(record, date) {
  let punchIn = record.timeInEvents.find(event => event.date === date)
  let punchOut = record.timeOutEvents.find(event => event.date === date)
  return !!punchOut ? (punchOut.hour - punchIn.hour) / 100 : 0
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
  let dates = record.timeInEvents.map(event => event.date)
  let wages = dates.map(date => wagesEarnedOnDate(record, date))
  return wages.reduce((total, wage) => total += wage)
}

function calculatePayroll(arr) {
  let payments = arr.map(record => allWagesFor(record))
  return payments.reduce((total, payment) => total += payment)
}

function findEmployeeByFirstName(arr, firstName) {
  return arr.find(employee => employee.firstName === firstName)
}