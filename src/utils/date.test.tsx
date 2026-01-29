import {getCurrentDate} from './date';

describe('date utils', () => {
  it('it gets current date', () => {
    // Arrange
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const expectedDate = `${year}-${month}-${day}`;

    // Act
    const currentDate = getCurrentDate('YYYY-MM-DD');

    // Assert
    expect(currentDate).toBe(expectedDate);
  });
});
