/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isAlphanumeric(char) {
  let code = char.charCodeAt(0)
  return (code >= 65 && code <= 90) ||   // A-Z
  (code >= 97 && code <= 122) // a-z
}

function isPalindrome(str) {
  s = str.toLowerCase()

  l = 0
  r = str.length - 1
  while (l < r) {
    while (!isAlphanumeric(s[l])) l++
    while (!isAlphanumeric(s[r])) r--
    if (s[l] != s[r]) return false
    l++
    r--
  }

  return true
}

module.exports = isPalindrome;
