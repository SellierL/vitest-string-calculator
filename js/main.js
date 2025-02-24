export function add(numbersStr)
{
    if (numbersStr === "") {
        return 0;
    }

    let delimiter = /,|\n/;

    let multipleDelimitersMatch = numbersStr.match(/^\/\/(\[.*\])\n/);
    let singleCharDelimiterMatch = numbersStr.match(/^\/\/(.)\n/);

    if (multipleDelimitersMatch) {
        let delimiterDefinition = multipleDelimitersMatch[1];

        let delimiters = delimiterDefinition.match(/\[(.*?)\]/g).map(d => d.slice(1, -1));
        
        let escapedDelimiters = delimiters.map(d => d.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));

        delimiter = new RegExp(escapedDelimiters.join('|'), 'g');

        numbersStr = numbersStr.substring(multipleDelimitersMatch[0].length);
    } 
    else if (singleCharDelimiterMatch) {
        delimiter = new RegExp(singleCharDelimiterMatch[1], 'g');
        numbersStr = numbersStr.substring(singleCharDelimiterMatch[0].length);
    }

    let parts = numbersStr.split(delimiter);
    let numbers = parts.map(num => parseInt(num, 10));

    let negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
    }

    let extrem = numbers.filter(num => num <= 1000);

    return extrem.reduce((acc, num) => acc + num, 0);
}