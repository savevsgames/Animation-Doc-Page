// This is an event listener telling us when the DOM is loaded
// When it is loaded, we can access the square element
document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(".square");
  // Animation Effect => keyframe effect
  //   const squareAnimationKeyframes = new KeyframeEffect(element, keyframes, options);
  // KeyframeEffect constructor => 1st arg: element to animate (square) 2nd arg: keyframes 3rd arg: options
  // each keyfram becomes an object with the properties we want to animate in quotes - spelling must be correct
  const squareAnimationKeyframes = new KeyframeEffect(
    element,
    [
      {
        transform: "translateX(0)",
      },
      {
        // offset is the time in the animation - @80% this object will be applied
        backgroundColor: "blue",
        offset: 0.8,
      },
      {
        transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
        backgroundColor: "crimson",
      },
    ],
    // duration of the animation in milliseconds
    {
      duration: 3000,
      iterations: Infinity, // number of times the animation will repeat
      direction: "alternate", // direction of the animation
      easing: "ease-in-out", // timing
      fill: "both", // fill mode
      delay: 0, // delay before the animation starts
      composite: "replace", // composite operation - add, accumulate, replace
    }
  );

  // Animation constructor => 1st arg: keyframe effect (created above) 2nd arg: timeline to associate the animation with
  const squareAnimationEffect = new Animation(
    squareAnimationKeyframes,
    document.timeline
  );

  // console log the animation keyframes and effect
  console.log("AnimationKeyframes", squareAnimationKeyframes);
  console.log("AnimationEffect", squareAnimationEffect);

  // play the animation
  squareAnimationEffect.play();

  // Event listener to pause the animation
  const pauseButton = document.querySelector(".pause");
  pauseButton.addEventListener("click", function () {
    squareAnimationEffect.pause();
  });

  // Event listener to play the animation
  const playButton = document.querySelector(".play");
  playButton.addEventListener("click", function () {
    squareAnimationEffect.play();
  });
});
