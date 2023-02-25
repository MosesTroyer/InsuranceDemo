import 'jest';
import { Vehicle } from './vehicle';

describe('Vehicle', () => {
    it('Should throw with no input', () => {
        expect(() => { new Vehicle(null) }).toThrowError(`Vehicle input was not provided.`);
    });

    it('Should default on bad input', () => {
        const vehicle = new Vehicle({
            vin: 123,
            make: 123,
            model: 123,
            year: 'Two Thousand Seventeen'
        });
        expect(vehicle.vin).toBe('');
        expect(vehicle.make).toBe('');
        expect(vehicle.model).toBe('');
        expect(vehicle.year).toBe(0);
    });

    it('Should validate incorrect input', () => {
        expect(new Vehicle({
            vin: 'ABC123',
            make: 'Honda',
            model: 'Civic',
            year: 1940
        }).validate()).toBeFalsy();

        expect(new Vehicle({
            vin: 'ABC123',
            make: 'Honda',
            model: 'Civic',
            year: 40000
        }).validate()).toBeFalsy();

        expect(new Vehicle({
            make: 'Honda',
            model: 'Civic',
            year: 1990
        }).validate()).toBeFalsy();

        expect(new Vehicle({
            vin: 'ABC123',
            model: 'Civic',
            year: 1990
        }).validate()).toBeFalsy();

        expect(new Vehicle({
            vin: 'ABC123',
            make: 'Honda',
            year: 1990
        }).validate()).toBeFalsy();
    });

    it('Should validate correct input', () => {
        expect(new Vehicle({
            vin: 'ABC123',
            make: 'Honda',
            model: 'Civic',
            year: 1990,
        }).validate()).toBeTruthy();
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