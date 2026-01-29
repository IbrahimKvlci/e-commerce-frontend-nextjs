
export const formatPrice = (amount: number, currency: string = 'TRY'): string => {
    if (amount === null || amount === undefined) return '';

    if (currency !== 'TRY') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }
    const formattedNumber = new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return `${formattedNumber} TL`;
};