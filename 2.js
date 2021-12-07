function sortArray(arr) {
  let finalArr = [];
  let checker = ["D", "u", "m", "b", "w", "a", "y", "s", " ", "i", "s", " ", "a", "w", "e", "s", "o", "m", "e"];
  for (let i = 0; i < arr.length; i++) {
    arr.find((str) => {
      if (str == checker[i]) {
        return finalArr.push(str);
      }
    });
  }
  return console.log(finalArr.join(""));
}
sortArray(["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "]);
