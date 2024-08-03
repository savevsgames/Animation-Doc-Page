// This is an event listener telling us when the DOM is loaded
// When it is loaded, we can access the square element
document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(".square");

  // the animate method is a property of the element
  // 1st arg: keyframes 2nd arg: options
  const squareAnimation = element.animate(
    [
      {
        transform: "translateX(0)",
        easing: "ease-in",
        
      },
      {
        // offset is the time in the animation - @ 80% through animation this object will be fully applied
        backgroundColor: "darkblue",
        offset: 0.5,
        composite: "replace",
      },
      {
        transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
        backgroundColor: "white",
      },
    ],
    {
      duration: 3000,
      iterations: Infinity, // number of times the animation will repeat
      direction: "alternate", // direction of the animation
      easing: "ease-in-out", // timing
      fill: "both", // fill mode
      delay: 0, // delay before the animation starts
      composite: "replace", // composite operation - add, accumulate, replace

      // We can also pass additional information to the animate method
      timeline: document.timeline, // default is the document timeline
    }
  );

  // Event listener to pause the animation
  const pauseButton = document.querySelector(".pause");
  pauseButton.addEventListener("click", function () {
    squareAnimation.pause();
  });

  // Event listener to play the animation
  const playButton = document.querySelector(".play");
  playButton.addEventListener("click", function () {
    squareAnimation.play();
  });
});

// function formatDate(userDate) {
//   // format from M/D/YYYY to YYYYMMDD
//   const dateToFormat = Date.parse(userDate);

//   const formattedDate = dateToFormat;

//   return formattedDate;
// }

// console.log(formatDate("12/31/2014"));

// function calculateFinalSpeed(initialSpeed, inclinations) {
//   // Your code goes here
//   let currentSpeed = initialSpeed;

//   for (let i = 0; i < inclinations.length; i++) {
//     currentSpeed += inclinations[i];
//     console.log("currentSpeed: ", currentSpeed);
//     if (currentSpeed <= 0) {
//       return 0;
//     }
//   }
//   return currentSpeed;
// }

// console.log("Calc:", calculateFinalSpeed(60, [0, 30, 0, -45, 0]));
