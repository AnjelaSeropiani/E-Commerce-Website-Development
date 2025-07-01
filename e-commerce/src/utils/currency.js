const exchangeRates = {
    USD: 1,
    EUR: 0.9,
    GBP: 0.8,
    JPY: 110,
    GEL: 3.1,
    // Add more currencies and rates as needed
};

const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    GEL: '₾',
    // Add more currency symbols as needed
};

/**
 * Converts a price in USD to the selected currency.
 * @param {number} price - Price in USD.
 * @param {string} currency - Target currency code.
 * @returns {number} Converted price.
 */
export function convertPrice(price, currency) {
    const rate = exchangeRates[currency] || 1;
    return price * rate;
}

/**
 * Formats a price with the currency symbol.
 * @param {number} price - Price amount.
 * @param {string} currency - Currency code.
 * @returns {string} Formatted price string.
 */
export function formatPrice(price, currency) {
    const symbol = currencySymbols[currency] || '$';
    return `${symbol} ${price.toFixed(2)}`;
}

/**
 * Converts and formats a price from USD to the selected currency.
 * @param {number} price - Price in USD.
 * @param {string} currency - Target currency code.
 * @returns {string} Formatted price string in target currency.
 */
export function convertAndFormatPrice(price, currency) {
    const converted = convertPrice(price, currency);
    return formatPrice(converted, currency);
}
