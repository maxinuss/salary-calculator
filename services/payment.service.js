import fs from "fs";
const HOUR_RATES = JSON.parse(fs.readFileSync('hour_rate.json').toString());

export const MINUTES_IN_AN_HOUR = 60;
export const MINUTES_IN_A_DAY = 24 * MINUTES_IN_AN_HOUR;
export const MINUTES_RATES = {};

function getMinutesFromInteger(hourInt) {
  return hourInt % 100 + (hourInt - (hourInt % 100)) / 100 * MINUTES_IN_AN_HOUR
}

export function convertHourlyRangesIntoPriceByMinute() {
  HOUR_RATES.map(hr => {
    hr.rates.map(r => {
      const minutesFrom = getMinutesFromInteger(parseInt(r.from.replace(':', ''), 10));
      let minutesTo = getMinutesFromInteger(parseInt(r.to.replace(':', ''), 10));

      if (minutesTo === 0) {
        minutesTo = MINUTES_IN_A_DAY;
      }

      for (let i = Math.round(minutesFrom) - 1; i < minutesTo; i++) {
        MINUTES_RATES[hr.day] = { ...MINUTES_RATES[hr.day], [`${i}`]: r.rate / MINUTES_IN_AN_HOUR };
      }
    });
  });
}

function getRangeOfWorkedMinutesOnATheDay(from, to) {
  const fromInMinutes = getMinutesFromInteger(from);
  const toInMinutes = getMinutesFromInteger(to);

  return { from: fromInMinutes, to: toInMinutes }
}

function getDayRate(day, rates, {from, to}) {
  let total = 0;
  const workedFrom = parseInt(from.replace(':', ''), 10);
  const workedTo = parseInt(to.replace(':', ''), 10);

  const minutesRange = getRangeOfWorkedMinutesOnATheDay(workedFrom, workedTo);
  for (let i = minutesRange.from; i < minutesRange.to; i++) {
    total += MINUTES_RATES[day][i];
  }

  return total;
}

export function calculateSalary(employee) {
  const total = employee.workedHours.reduce((total, obj) => {
    const { rates: dayRates } = HOUR_RATES.filter(r => r.day === obj.day)[0];
    const dayRate = getDayRate(obj.day, dayRates, obj);

    if (dayRate && !isNaN(dayRate)) {
      total = total + dayRate;
    }

    return Math.fround(total);
  }, 0);

  console.log(`The amount to pay ${employee.name} is: ${total} USD`);
}