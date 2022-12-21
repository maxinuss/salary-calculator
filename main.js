import * as paymentService from './services/payment.service.js';
import * as workLogService from './services/workLog.service.js';

paymentService.convertHourlyRangesIntoPriceByMinute();
workLogService.createObjectFromWorkLogInput()
  .map(employee => paymentService.calculateSalary(employee));