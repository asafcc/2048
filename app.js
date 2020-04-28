const boxes = document.querySelectorAll(".box");

let emptyPlaces = [];

//if the boxes can move
let isMoved = false;
let max = 0;

for (let i = 0; i < 16; i++) {
  emptyPlaces.push(i);
}

function addAtRandomPlace(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (emptyPlaces.length !== 0) {
        let randomIndex = Math.floor(Math.random() * emptyPlaces.length);
        let placeToAdd = emptyPlaces[randomIndex];

        let randomNumber = Math.random() > 0.5 ? 2 : 4;

        boxes[placeToAdd].innerHTML = randomNumber;
        boxes[placeToAdd].classList.add(`box-${randomNumber}`);
        emptyPlaces.splice(randomIndex, 1);
        resolve();
      }
    }, time);
  });
}

addAtRandomPlace(0);
addAtRandomPlace(0);

document.addEventListener("keydown", keyPressHandler);

function goUp() {
  for (let k = 12; k <= 15; k++) {
    //moving from bottom boxes

    //sum vertical boxes
    for (let i = k; i >= k - 8; i -= 4) {
      if (
        boxes[i].innerHTML === boxes[i - 4].innerHTML &&
        boxes[i - 4].innerHTML !== "" &&
        boxes[i].innerHTML !== ""
      ) {
        //box is the same as the above and both not empty
        let sum = parseInt(boxes[i].innerHTML) * 2;

        boxes[i].innerHTML = "";
        boxes[i].classList = "box";

        boxes[i - 4].innerHTML = sum;
        boxes[i - 4].classList = `box box-${sum}`;

        boxes[i - 4].style.animation = `add 0.2s alternate 2`;
        boxes[i - 4].addEventListener("animationend", () => {
          boxes[i - 4].style.animation = null;
        });

        isMoved = true;
      }
    }
    //take boxes up as they can
    for (let j = 1; j <= 3; j++) {
      //box can go up max 3 times
      for (let i = k - 8; i <= k; i += 4) {
        if (boxes[i].innerHTML !== "" && boxes[i - 4].innerHTML === "") {
          boxes[i - 4].innerHTML = boxes[i].innerHTML;
          boxes[i - 4].classList = `box box-${boxes[i].innerHTML}`;

          boxes[i].innerHTML = "";
          boxes[i].classList = "box";
          isMoved = true;
        }
      }
    }
  }
}

function goRight() {
  for (let k = 0; k <= 12; k += 4) {
    //moving from bottom boxes

    //sum Horizontal boxes
    for (let i = k; i <= k + 2; i++) {
      if (
        boxes[i].innerHTML === boxes[i + 1].innerHTML &&
        boxes[i + 1].innerHTML !== "" &&
        boxes[i].innerHTML !== ""
      ) {
        //box is the same as the right one and both not empty
        let sum = parseInt(boxes[i].innerHTML) * 2;

        boxes[i].innerHTML = "";
        boxes[i].classList = "box";

        boxes[i + 1].innerHTML = sum;
        boxes[i + 1].classList = `box box-${sum}`;

        boxes[i + 1].style.animation = `add 0.2s alternate 2`;
        boxes[i + 1].addEventListener("animationend", () => {
          boxes[i + 1].style.animation = null;
        });
        isMoved = true;
      }
    }
    //take boxes right as they can
    for (let j = 1; j <= 3; j++) {
      //box can go right max 3 times
      for (let i = k + 2; i >= k; i--) {
        if (boxes[i].innerHTML !== "" && boxes[i + 1].innerHTML === "") {
          boxes[i + 1].innerHTML = boxes[i].innerHTML;
          boxes[i + 1].classList = `box box-${boxes[i].innerHTML}`;

          boxes[i].innerHTML = "";
          boxes[i].classList = "box";
          isMoved = true;
        }
      }
    }
  }
}

function goLeft() {
  for (let k = 3; k <= 15; k += 4) {
    //moving from bottom boxes

    //sum Horizontal boxes
    for (let i = k; i >= k - 2; i--) {
      if (
        boxes[i].innerHTML === boxes[i - 1].innerHTML &&
        boxes[i - 1].innerHTML !== "" &&
        boxes[i].innerHTML !== ""
      ) {
        //box is the same as the left one and both not empty
        let sum = parseInt(boxes[i].innerHTML) * 2;

        boxes[i].innerHTML = "";
        boxes[i].classList = "box";

        boxes[i - 1].innerHTML = sum;
        boxes[i - 1].classList = `box box-${sum}`;

        boxes[i - 1].style.animation = `add 0.2s alternate 2`;
        boxes[i - 1].addEventListener("animationend", () => {
          boxes[i - 1].style.animation = null;
        });

        isMoved = true;
      }
    }
    //take boxes left as they can
    for (let j = 1; j <= 3; j++) {
      //box can go left max 3 times
      for (let i = k - 2; i <= k; i++) {
        if (boxes[i].innerHTML !== "" && boxes[i - 1].innerHTML === "") {
          boxes[i - 1].innerHTML = boxes[i].innerHTML;
          boxes[i - 1].classList = `box box-${boxes[i].innerHTML}`;

          boxes[i].innerHTML = "";
          boxes[i].classList = "box";
          isMoved = true;
        }
      }
    }
  }
}

function goDown() {
  for (let k = 0; k <= 3; k++) {
    //moving from bottom boxes

    //sum Horizontal boxes
    for (let i = k; i <= k + 8; i += 4) {
      if (
        boxes[i].innerHTML === boxes[i + 4].innerHTML &&
        boxes[i + 4].innerHTML !== "" &&
        boxes[i].innerHTML !== ""
      ) {
        //box is the same as the above and both not empty
        let sum = parseInt(boxes[i].innerHTML) * 2;

        boxes[i].innerHTML = "";
        boxes[i].classList = "box";

        boxes[i + 4].innerHTML = sum;
        boxes[i + 4].classList = `box box-${sum}`;

        boxes[i + 4].style.animation = `add 0.2s alternate 2`;
        boxes[i + 4].addEventListener("animationend", () => {
          boxes[i + 4].style.animation = null;
        });

        isMoved = true;
      }
    }
    //take boxes down as they can
    for (let j = 1; j <= 3; j++) {
      //box can go down max 3 times
      for (let i = k + 8; i >= k; i -= 4) {
        if (boxes[i].innerHTML !== "" && boxes[i + 4].innerHTML === "") {
          boxes[i + 4].innerHTML = boxes[i].innerHTML;
          boxes[i + 4].classList = `box box-${boxes[i].innerHTML}`;

          boxes[i].innerHTML = "";
          boxes[i].classList = "box";
          isMoved = true;
        }
      }
    }
  }
}

function checkLose() {
  for (let i = 0; i <= 15; i++) {
    if (i == 0) {
      if (
        boxes[0].innerHTML === boxes[1].innerHTML ||
        boxes[0].innerHTML === boxes[4].innerHTML
      )
        return;
    }
    if (i == 1) {
      if (
        boxes[1].innerHTML === boxes[0].innerHTML ||
        boxes[1].innerHTML === boxes[5].innerHTML ||
        boxes[1].innerHTML === boxes[2].innerHTML
      )
        return;
    }
    if (i == 2) {
      if (
        boxes[2].innerHTML === boxes[1].innerHTML ||
        boxes[2].innerHTML === boxes[6].innerHTML ||
        boxes[2].innerHTML === boxes[3].innerHTML
      )
        return;
    }
    if (i == 3) {
      if (
        boxes[3].innerHTML === boxes[2].innerHTML ||
        boxes[3].innerHTML === boxes[7].innerHTML
      )
        return;
    }
    if (i == 4) {
      if (
        boxes[4].innerHTML === boxes[0].innerHTML ||
        boxes[4].innerHTML === boxes[5].innerHTML ||
        boxes[4].innerHTML === boxes[8].innerHTML
      )
        return;
    }
    if (i == 5) {
      if (
        boxes[5].innerHTML === boxes[1].innerHTML ||
        boxes[5].innerHTML === boxes[4].innerHTML ||
        boxes[5].innerHTML === boxes[6].innerHTML ||
        boxes[5].innerHTML === boxes[9].innerHTML
      )
        return;
    }
    if (i == 6) {
      if (
        boxes[6].innerHTML === boxes[2].innerHTML ||
        boxes[6].innerHTML === boxes[5].innerHTML ||
        boxes[6].innerHTML === boxes[7].innerHTML ||
        boxes[6].innerHTML === boxes[10].innerHTML
      )
        return;
    }
    if (i == 7) {
      if (
        boxes[7].innerHTML === boxes[3].innerHTML ||
        boxes[7].innerHTML === boxes[6].innerHTML ||
        boxes[7].innerHTML === boxes[11].innerHTML
      )
        return;
    }
    if (i == 8) {
      if (
        boxes[8].innerHTML === boxes[4].innerHTML ||
        boxes[8].innerHTML === boxes[9].innerHTML ||
        boxes[8].innerHTML === boxes[12].innerHTML
      )
        return;
    }
    if (i == 9) {
      if (
        boxes[9].innerHTML === boxes[5].innerHTML ||
        boxes[9].innerHTML === boxes[8].innerHTML ||
        boxes[9].innerHTML === boxes[10].innerHTML ||
        boxes[9].innerHTML === boxes[13].innerHTML
      )
        return;
    }
    if (i == 10) {
      if (
        boxes[10].innerHTML === boxes[6].innerHTML ||
        boxes[10].innerHTML === boxes[9].innerHTML ||
        boxes[10].innerHTML === boxes[11].innerHTML ||
        boxes[10].innerHTML === boxes[14].innerHTML
      )
        return;
    }
    if (i == 11) {
      if (
        boxes[11].innerHTML === boxes[7].innerHTML ||
        boxes[11].innerHTML === boxes[10].innerHTML ||
        boxes[11].innerHTML === boxes[15].innerHTML
      )
        return;
    }
    if (i == 12) {
      if (
        boxes[12].innerHTML === boxes[8].innerHTML ||
        boxes[12].innerHTML === boxes[13].innerHTML
      )
        return;
    }
    if (i == 13) {
      if (
        boxes[13].innerHTML === boxes[9].innerHTML ||
        boxes[13].innerHTML === boxes[12].innerHTML ||
        boxes[13].innerHTML === boxes[14].innerHTML
      )
        return;
    }
    if (i == 14) {
      if (
        boxes[14].innerHTML === boxes[10].innerHTML ||
        boxes[14].innerHTML === boxes[13].innerHTML ||
        boxes[14].innerHTML === boxes[15].innerHTML
      )
        return;
    }
    if (i == 15) {
      if (
        boxes[15].innerHTML === boxes[11].innerHTML ||
        boxes[15].innerHTML === boxes[14].innerHTML
      )
        return;
    }
  }
  alert("You have lost!");
  document.removeEventListener("keydown", keyPressHandler);
}

async function keyPressHandler(e) {
  switch (e.keyCode) {
    case 38:
      goUp();
      break;
    case 37:
      goLeft();
      break;
    case 39:
      goRight();
      break;
    case 40:
      goDown();
  }

  //finds all empty spaces
  emptyPlaces = [];
  boxes.forEach((box, i) => {
    if (box.innerHTML == "") {
      emptyPlaces.push(i);
    } else {
      max = Number(box.innerHTML) > max ? box.innerHTML : max;
    }
  });

  if (max == 2048) {
    alert("WIN!!!");
    document.removeEventListener("keydown", keyPressHandler);
  }

  if (isMoved) {
    //if the boxes could move, the keypress is ok, and need to add new random number
    //adds 2 or 4 to an empty random place
    await addAtRandomPlace(200);
  }

  if (emptyPlaces.length === 0) {
    checkLose();
  }
  isMoved = false;
}
