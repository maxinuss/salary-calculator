import * as workLogService from './../src/services/workLog.service.js';

test('Should convert work log txt into object', () => {
  const result = workLogService.createObjectFromWorkLogInput();

  expect(result[0].name).toBe('ASTRID');
});