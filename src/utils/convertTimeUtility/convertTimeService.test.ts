import { converTimeZone, getCurrentDate } from './convertTimeUtility';

describe('convert timezone in UTC', () => {
    it('should convert timezone to time format correctly', () => {
        const timezone = 10800;
        const unit = 'time';
        const expected = '18:00';

        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(1620658800000);

        const result = converTimeZone(timezone, unit);

        expect(result).toBe(expected);
    });

    it('should convert timezone to date format correctly', () => {
        const timezone = 10800;
        const unit = 'date';
        const expected = 'May 1';

        jest.spyOn(Date.prototype, 'getTime').mockReturnValue(1620658800000);

        const result = converTimeZone(timezone, unit);

        expect(result).toBe(expected);
    });

    describe('get current date', () => {
        it('should return formatted current date', () => {
            const dateIso = '2023-05-10T09:37:06.512Z';

            expect(getCurrentDate(dateIso)).toBe('10.05 12:37:06');
        });
    });
});
