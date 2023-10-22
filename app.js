const { Trie } = require("./trie");
const fs = require("fs");

const trie = new Trie();

/*
 * check if the word is a concatenation of small words
 */
const wordChecker = (word) => {
  let index = 1;

  while (index <= word.length) {
    const length = trie.find(word.substr(0, index)).length;

    if (!(length > 1) && index === 1) {
      return false;
    } else if (!(length > 1)) {
      return wordChecker(word.substr(index - 1, word.length));
    } else {
      index++;
    }
  }
  return true;
};

/**
 *  find the longest string in the array
 */
const LongestString = (arr) => {
  let longestString = arr.reduce(function (x, y) {
    return x.length > y.length ? x : y;
  });
  return longestString;
};

/**
 * search concatenation words
 */
const searchConcatWords = (file, noOfResults) => {
  const result = [];

  const text = fs.readFileSync(file, "utf-8").split("\r\n");

  // Inserting into the trie
  text.forEach((item) => {
    trie.insert(item);
  });

  // Loop to find LongestConcatStrings
  while (noOfResults) {
    let longestString = LongestString(text);
    text.splice(text.indexOf(longestString), 1);

    if (wordChecker(longestString)) {
      result.push(longestString);
      noOfResults--;
    }
  }

  return result;
};

// -----------------------------------------
const start1 = performance.now();
const result1 = searchConcatWords("./Input_01.txt", 2);
const end1 = performance.now();

console.log(result1[0], result1[1], end1 - start1 + "ms", "\n");

const start2 = performance.now();
const result2 = searchConcatWords("./Input_02.txt", 2);
const end2 = performance.now();

console.log(result2[0], result2[1], end2 - start2 + "ms", "\n");
