// This is an event listener telling us when the DOM is loaded
// When it is loaded, we can access the square element
document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(".square");

  // the animate method is a property of the element
  // 1st arg: keyframes 2nd arg: options
  // squareAnimation is like our DVD player and its prototype methods include play, pause, etc
  const squareAnimation = element.animate(
    // Keyframes belong to keyframe effect - not to animation Object.
    // When we animate we pass the Keyframes Array, then the parameters as an Object.
    // All of these belong to the Keyframe Effect!!!
    // A Keyframe Effect is an object that has an array of objects, where each object represents a keyframe.
    // The second part of a keyframe effect is the parameters for those keyframe adjustments.
    // ie. startingX = 0 is a keyframe / easing: ease is a parameter for that keyframe
    [
      {
        transform: "translateX(0) rotate(0deg) scale(10%)",
      },
      {
        // offset is the time in the animation - @ 80% through animation this object will be fully applied
        backgroundColor: "darkblue",
        offset: 0.2,
        composite: "replace",
        borderRadius: "50%",
        easing: "ease-in",
      },
      {
        transform: "translateX(calc(100vw - 100px)) rotate(360deg) scale(200%)",
        backgroundColor: "crimson",
      },
    ],
    {
      duration: 3000,
      iterations: Infinity, // number of times the animation will repeat ie Infinity, 0, 1, 2, etc
      direction: "alternate", // direction of the animation, normal, alternate, etc
      easing: "linear", // timing - ease-in-out, ease, linear
      fill: "both", // fill mode
      delay: 0, // delay before the animation starts
      composite: "add", // composite operation - add, accumulate, replace
      iterationComposite: "accummulate",
      // We can also pass additional information to the animate method
      timeline: document.timeline, // default is the document timeline
    }
  );
  console.log(squareAnimation.effect);
  console.log(squareAnimation);
  // Event listeners - attached to buttons to trigger animation OBJECT
  // squareAnimation is the object and it has play, pause, cancel, reverse, finish - methods and more
  const playerButtons = document.querySelectorAll(".button");
  playerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("play")) {
        squareAnimation.play();
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
      }
      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }
      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }
    });
  });

  const playbackRateInput = document.getElementById("playbackRateInput");
  const playbackRateInputValue = document.getElementById(
    "playbackRateInputValue"
  );

  playbackRateInput.addEventListener("input", (event) => {
    playbackRate = event.target.value;
    // updatePlaybackRate is a native function that the animation player comes with
    squareAnimation.updatePlaybackRate(playbackRate);
    playbackRateInputValue.value = event.target.value;
  });
});
