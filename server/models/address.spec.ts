import 'jest';
import { Address } from './address';

describe('Address', () => {
    it('Should default on bad input', () => {
        const address = new Address({
            street: 123,
            city: 456,
            state: 789,
            zipCode: 'Six Zero Six Zero Two',
        });
        expect(address.state).toBe('');
        expect(address.city).toBe('');
        expect(address.state).toBe('');
        expect(address.zipCode).toBe(0);
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

    it('Should validate bad addresses', () => {
        expect(new Address({
           city: 'Chicago',
           state: 'IL',
           zipCode: 60602,
        }).validate()).toBeFalsy();

        expect(new Address({
            street: '121 N. LaSalle',
            state: 'IL',
            zipCode: 60602,
        }).validate()).toBeFalsy();

        expect(new Address({
            street: '121 N. LaSalle',
            city: 'Chicago',
            zipCode: 60602,
        }).validate()).toBeFalsy();

        expect(new Address({
            street: '121 N. LaSalle',
            city: 'Chicago',
            state: 'IL',
        }).validate()).toBeFalsy();
    });

    it('Should validate good addresses', () => {
        expect(new Address({
            street: '121 N. LaSalle',
            city: 'Chicago',
            state: 'IL',
            zipCode: 60602,
        }).validate()).toBeTruthy();

    });
});