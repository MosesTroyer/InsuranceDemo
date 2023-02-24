import 'jest';
import { Address } from './address';

describe('Address', () => {
    it('Should throw with no input', () => {
        expect(() => { new Address(null) }).toThrowError(`Address input was not provided.`);
    });

    it('Should throw on bad street', () => {
        expect(() => { new Address({
                street: 123
            })
        }).toThrowError(`Unable to validate street`);
    });

    it('Should throw on bad city', () => {
        expect(() => { new Address({
                street: '121 N. LaSalle',
                city: 123,
            })
        }).toThrowError(`Unable to validate city`);
    });

    it('Should throw on bad state', () => {
        expect(() => { new Address({
                street: '121 N. LaSalle',
                city: 'Chicago',
                state: 123,
            })
        }).toThrowError(`Unable to validate state`);
    });

    it('Should throw on bad zip', () => {
        expect(() => { new Address({
                street: '121 N. LaSalle',
                city: 'Chicago',
                state: 'IL',
                zipCode: 'Six Zero Six Zero Two',
            })
        }).toThrowError(`Unable to validate zipCode`);
    });

    it('Should return clean address', () => {
        expect(JSON.stringify(new Address({
            street: '121 N. LaSalle',
            city: 'Chicago',
            state: 'IL',
            zipCode: 60602,
        }))).toBe(
          JSON.stringify({
              street: '121 N. LaSalle',
              city: 'Chicago',
              state: 'IL',
              zipCode: 60602,
          })
        );
    });
});