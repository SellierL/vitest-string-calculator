import { expect, test } from 'vitest'
import { describe, expect, it } from 'vitest'
import { add} from '../js/main.js'
/*decrible('est of the function add()', () => {
    it('return error for invalid input', () =>{
        expect() => add ('1,\n').toThrow()
    })
});
*/

test('test for empty string', () => {
  expect(add('')).toBe(0)
})

test('test for one character', () => {
    expect(add('1')).toBe(1)
})

test('test for 2 numbers', () => {
    expect(add('1,2')).toBe(3)
})

test('test for multiple numbers', () => {
    expect(add('1,2,3,4,5')).toBe(15);
});

test('test with newline as separator', () => {
    expect(add('1\n2,3')).toBe(6);
});

test('test with custom separator', () => {
    expect(add('//;\n1;2')).toBe(3);
});

test('test with negative number should throw an exception', () => {
    expect(() => add('1,-2,3')).toThrow('Negatives not allowed: -2');
});

test('test with multiple negative numbers should throw an exception', () => {
    expect(() => add('1,-2,3,-4,-5')).toThrow('Negatives not allowed: -2, -4, -5');
});


test('test with numbers greater than 1000 should be ignored', () => {
    expect(add('1\n2,1002')).toBe(3);
});

test('test with multiple large numbers', () => {
    expect(add('1000,1001,2,2000,3')).toBe(1005);
});

test('test with multi-character custom separator', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
});

test('test with multiple custom separators', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
});

test('test with multiple long custom separators', () => {
    expect(add('//[***][%%%]\n1***2%%%3')).toBe(6);
});