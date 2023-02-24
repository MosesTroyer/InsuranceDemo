import 'jest';
import {validateDate, validateNumber, validateString} from "./inputValidators";

describe('InputValidators', () => {

    describe('Validate String', () => {
        it('should throw for no value', async () => {
            expect(() => { validateString({}, 'test') }).toThrowError(`Unable to validate test`);
        });

        it('should throw for not-string', async () => {
            expect(() => { validateString({ test: 123 }, 'test') }).toThrowError(`Unable to validate test`);
        });

        it('should return correctly', async () => {
            expect(validateString({ test: 'Abc' }, 'test')).toBe('Abc');
        });
    });

    describe('Validate Number', () => {
        it('should throw for no value', async () => {
            expect(() => { validateNumber({}, 'test') }).toThrowError(`Unable to validate test`);
        });

        it('should throw for not-number', async () => {
            expect(() => { validateNumber({ test: 'Abc' }, 'test') }).toThrowError(`Unable to validate test`);
        });

        it('should return correctly', async () => {
            expect(validateNumber({ test: 123 }, 'test')).toBe(123);
        });
    });

    describe('Validate Date', () => {
        it('should throw for no value', async () => {
            expect(() => { validateDate({}, 'test') }).toThrowError(`Unable to validate test`);
        });

        it('should throw for invalid date', async () => {
            expect(() => { validateDate({ test: 'Abc' }, 'test') }).toThrowError(`Unable to validate test`);
        });

        it('should return correctly', async () => {
            expect(validateDate({ test: '1/1/2023' }, 'test')).toEqual(new Date(Date.parse('1/1/2023')));
        });
    });
});