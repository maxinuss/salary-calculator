import * as paymentService from './../src/services/payment.service.js';
test('Calculate salary', () => {
  const employee = {
      name: 'MATT',
      workedHours: [
        { day: 'MO', from: '10:30', to: '12:00' },
        { day: 'TH', from: '10:45', to: '13:00' }
      ]
    };

  paymentService.convertHourlyRangesIntoPriceByMinute();
  expect(paymentService.calculateSalary(employee)).toBe(56.25);
});