import fs from "fs";

const EMPLOYEES_WORK_LOG = fs.readFileSync('employees_work_log.txt').toString();

export function createObjectFromWorkLogInput() {
  return EMPLOYEES_WORK_LOG.split(/\r?\n/).map(workLog => {
    const logData = workLog.split('=');
    const employee = logData[0];
    const workedHours = logData[1].split(',').map(data => {
      const day = data.substring(0, 2);
      const date = data.substring(2).split('-')

      return { day, from: date[0], to: date[1] };
    });

    return { name: employee,  workedHours }
  });
}