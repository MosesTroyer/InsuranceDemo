export function cleanString(input: any, field: string): string {
    const value = input[field];

    if (!value || !(typeof value === 'string')) {
        return '';
    }

    return value;
}

export function cleanNumber(input: any, field: string): number {
    const value = input[field];

    if (value === undefined || value === null || isNaN(value)) {
        return 0;
    }

    return value;
}

export function cleanDate(input: any, field: string): Date {
    const value = Date.parse(input[field]);

    if (isNaN(value)) {
        return new Date();
    }

    return new Date(value);
}