// Access the testimonials
let testSlide = document.querySelectorAll(".testItem");
// Access the indicators
let dots = document.querySelectorAll(".dot");

var counter = 0;
var deleteInterval;

// Add click event to the indicators
function switchTest(currentTest) {
  currentTest.classList.add("active");
  var testId = currentTest.getAttribute("attr");
  if (testId > counter) {
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
const container = document.querySelector(".indicators");
container.addEventListener("mouseover", pause);
function pause() {
  clearInterval(deleteInterval);
}

// Resume sliding when mouse is out of the indicators
container.addEventListener("mouseout", autoSliding);

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
const testRow = document.querySelector(".testRow");
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
// Update SVG click event listener to use the video IDs
const svgElements = document.querySelectorAll(".image-box svg");

svgElements.forEach(svg => {
  svg.addEventListener("click", () => {
    const videoId = svg.getAttribute("id");
    const videoUrl = allVideos[videoId];

    // Create and show the popup with the correct video
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgba(0, 0, 0, 0.5)";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.width = "80%";
    popup.style.height = "80%";
    popup.style.display = "flex";
    popup.style.justifyContent = "center";
    popup.style.alignItems = "center";
    popup.innerHTML = `
      <iframe width="100%" height="100%" src="${videoUrl}" 
      frameborder="0" allowfullscreen></iframe>
      <button id="closePopup" style="position: absolute; top: 10px; right: 10px; background: #fff; border: none; padding: 10px; cursor: pointer;">X</button>
    `;
    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {
      document.body.removeChild(popup);
    });
  });
});

const allVideos = {
  video1: "https://www.youtube.com/embed/j8AkVCSoMm8?si=2U7i0KRxXBT5I3vl",
  video2: "https://www.youtube.com/embed/ETgtDdhVo1U?si=W8riHjwClhyPT33u",
  video3: "https://www.youtube.com/embed/tqweDynJWiQ?si=554uFoAwfFIqS9XO",
  video4: "https://www.youtube.com/embed/TPiCWUQ78CY?si=DNScabhxpoAtLCZv",
  video5: "https://www.youtube.com/embed/uM2hEVLOWAo?si=56CVpQMk0Pp7f6_K",
};
