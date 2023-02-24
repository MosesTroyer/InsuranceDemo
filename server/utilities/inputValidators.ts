export function validateString(input: any, field: string): string {
    const value = input[field];

    if (!value || !(typeof value === 'string')) {
        throw new Error(`Unable to validate ${ field }`);
    }

    return value;
}

export function validateNumber(input: any, field: string): number {
    const value = input[field];

    if (value === undefined || value === null || isNaN(value)) {
        throw new Error(`Unable to validate ${ field }`);
    }

    return value;
}

export function validateDate(input: any, field: string): Date {
    const value = Date.parse(input[field]);

    if (isNaN(value)) {
        throw new Error(`Unable to validate ${ field }`);
    }

    return new Date(value);
}