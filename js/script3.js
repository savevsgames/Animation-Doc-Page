// This is an event listener telling us when the DOM is loaded
// When it is loaded, we can access the square element
document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(".square");

  // the animate method is a property of the element
  // 1st arg: keyframes 2nd arg: options
  const squareAnimation = element.animate(
    // Key / Value Pairs - key is property, values are arrays
    // with 2 values, they are 0% and 100%,  ie - offset [0,1]
    // with 3 values they are 0, 50 and 100, etc.. unless specified ie offset [0,0.5, 1]
    {
      transform: [
        "translateX(0)",
        "translateX(calc(100vw - 100px)) rotate(360deg)",
      ], // does not need an offset, as the 1 is implied. ie. [0,1]

      backgroundColor: ["gold", "blue", "red"],
      // if we wanted blue to trigger at 30% instead of the default (50% in this case)
      offset: [0, 0.3, 1], // same as [0, 0.3] -> the 1 is implied.
      easing: ["ease-in"], // same as ["ease-in", "ease-in", "ease-in"]
      composite: ["add", "replace", "add"],
    },

    {
      duration: 3000,
      iterations: Infinity, // number of times the animation will repeat
      direction: "alternate", // direction of the animation
      //   easing: "ease-in-out", // timing
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
