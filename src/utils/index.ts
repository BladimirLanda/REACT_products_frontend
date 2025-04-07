//UTILS}

export function formatCurrency(amount : number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(amount);
}

export function toBoolean(str : string) {
    return str === "true";
} 