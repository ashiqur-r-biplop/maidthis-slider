// Access the testimonials
let testSlide = document.querySelectorAll(".testItem");
// Access the indicators
let dots = document.querySelectorAll(".dot");
const container = document.querySelector(".indicators");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const testRow = document.querySelector(".testRow");

var counter = 0;
var deleteInterval;

// Add click event to the indicators
function switchTest(currentTest) {
  currentTest.classList.add("active");

  var testId = currentTest.getAttribute("attr");
  console.log(testId, counter);

  if (parseInt(testId) > parseInt(counter)) {
    testSlide[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = testId;
    testSlide[counter].style.animation = "next2 0.5s ease-in forwards";
  } else if (testId == counter) {
    return;
  } else {
    testSlide[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = testId;
    testSlide[counter].style.animation = "prev2 0.5s ease-in forwards";
  }
  indicators();
}

// Add and remove active class from the indicators
function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

// Code for auto sliding
function slideNext() {
  testSlide[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= testSlide.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  testSlide[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}

function autoSliding() {
  deleteInterval = setInterval(timer, 5000);
  function timer() {
    slideNext();
    indicators();
  }
}

autoSliding();

// Stop auto sliding when mouse is over the indicators

container.addEventListener("mouseover", pause);
nextBtn.addEventListener("mouseover", pause);
prevBtn.addEventListener("mouseover", pause);

function pause() {
  clearInterval(deleteInterval);
}

// Resume sliding when mouse is out of the indicators
container.addEventListener("mouseout", autoSliding);
nextBtn.addEventListener("mouseout", autoSliding);
prevBtn.addEventListener("mouseout", autoSliding);
// Stop auto sliding when mouse is over the testimonials
testSlide.forEach(function (item) {
  item.addEventListener("mouseover", pause);
  item.addEventListener("mouseout", autoSliding);
});
document.getElementById("next").addEventListener("click", slideNext);
document.getElementById("prev").addEventListener("click", slidePrev);

function slidePrev() {
  testSlide[counter].style.animation = "prev1 0.5s ease-in forwards";
  if (counter <= 0) {
    counter = testSlide.length - 1;
  } else {
    counter--;
  }
  testSlide[counter].style.animation = "prev2 0.5s ease-in forwards";
  indicators();
}

let startX, moveX;

testRow.addEventListener("mousedown", startDragging);
testRow.addEventListener("mousemove", dragSlide);
testRow.addEventListener("mouseup", endDragging);

function startDragging(e) {
  startX = e.clientX;
}

function dragSlide(e) {
  if (!startX) return;
  moveX = e.clientX;
  const diff = moveX - startX;
  if (diff > 50) {
    // Swipe right
    slidePrev();
    startX = null;
  } else if (diff < -50) {
    // Swipe left
    slideNext();
    startX = null;
  }
}

function endDragging() {
  startX = null;
}
