/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  s1 = str1.toLowerCase()
  s2 = str2.toLowerCase()
  if (s1.length != s2.length) return false;
  if (s1.length == 1) return s1 == s2;

  let charMap = {}

  for (let ch of s1) {
    charMap[ch] = (charMap[ch] || 0) + 1;
  }

  for (let ch of s2) {
    if(!charMap[ch]) return false
    charMap[ch]--
  }

  for (let key in charMap) {
    if (charMap[key] != 0) return false
  }

  return true
}

module.exports = isAnagram;
