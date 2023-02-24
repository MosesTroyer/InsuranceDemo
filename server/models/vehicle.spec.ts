import 'jest';
import { Vehicle } from './vehicle';

describe('Vehicle', () => {
    it('Should throw with no input', () => {
        expect(() => { new Vehicle(null) }).toThrowError(`Vehicle input was not provided.`);
    });

    it('Should throw on bad vin', () => {
        expect(() => { new Vehicle({
                vin: 123
            })
        }).toThrowError(`Unable to validate vin`);
    });

    it('Should throw on bad make', () => {
        expect(() => { new Vehicle({
                vin: 'ABC123',
                make: 123,
            })
        }).toThrowError(`Unable to validate make`);
    });

    it('Should throw on bad model', () => {
        expect(() => { new Vehicle({
                vin: 'ABC123',
                make: 'Honda',
                model: 123,
            })
        }).toThrowError(`Unable to validate model`);
    });

    it('Should throw on bad year', () => {
        expect(() => { new Vehicle({
                vin: 'ABC123',
                make: 'Honda',
                model: 'Civic',
                year: 'Two Thousand Seventeen'
            })
        }).toThrowError(`Unable to validate year`);
    });

    it('Should throw on years before 1985 and after the current year', () => {
        expect(() => { new Vehicle({
                vin: 'ABC123',
                make: 'Honda',
                model: 'Civic',
                year: 1940
            })
        }).toThrowError(`Year is invalid.`);

        expect(() => { new Vehicle({
                vin: 'ABC123',
                make: 'Honda',
                model: 'Civic',
                year: 40000
            })
        }).toThrowError(`Year is invalid.`);
    });

    it('Should return clean vehicle', () => {
        expect(JSON.stringify(new Vehicle({
            vin: 'ABC123',
            make: 'Honda',
            model: 'Civic',
            year: 2017
        }))).toBe(
            JSON.stringify({
                vin: 'ABC123',
                make: 'Honda',
                model: 'Civic',
                year: 2017
            })
        );
    });
});