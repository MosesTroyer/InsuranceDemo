import 'jest';
import { cleanDate, cleanNumber, cleanString } from './inputValidators';

describe('InputValidators', () => {

    describe('Validate String', () => {
        it('should return default for no value', async () => {
            expect(cleanString({}, 'test')).toBe('');
        });

        it('should return default for not-string', async () => {
            expect(cleanString({ test: 123 }, 'test')).toBe('');
        });

        it('should return correctly', async () => {
            expect(cleanString({ test: 'Abc' }, 'test')).toBe('Abc');
        });
    });

    describe('Validate Number', () => {
        it('should return default for no value', async () => {
            expect(cleanNumber({}, 'test')).toBe(0);
        });

        it('should return default for not-number', async () => {
            expect(cleanNumber({ test: 'Abc' }, 'test')).toBe(0);
        });

        it('should return correctly', async () => {
            expect(cleanNumber({ test: 123 }, 'test')).toBe(123);
        });
    });

    describe('Validate Date', () => {
        it('should return default for no value', async () => {
            expect(cleanDate({}, 'test')).toBeInstanceOf(Date);
        });

        it('should return default for invalid date', async () => {
            expect(cleanDate({ test: 'Abc' }, 'test')).toBeInstanceOf(Date);
        });

        it('should return correctly', async () => {
            expect(cleanDate({ test: '1/1/2023' }, 'test')).toEqual(new Date(Date.parse('1/1/2023')));
        });
    });
});