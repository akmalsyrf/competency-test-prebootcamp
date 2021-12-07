function makeLine(length) {
  let line = "";
  for (let j = 1; j <= length; j++) {
    if (j % 2 == 0) {
      line += "+ ";
    } else {
      line += "# ";
    }
  }

  return line + "\n";
}

function buildTriangle(height) {
  let triangle = "";
  let space = "";
  for (let i = height; i >= 1; i--) {
    space += " ";

    // call makeline function
    triangle += makeLine(i) + space;
  }
  return triangle;
}

console.log(buildTriangle(10));
