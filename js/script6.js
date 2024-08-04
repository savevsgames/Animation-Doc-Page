// This is an event listener telling us when the DOM is loaded
// When it is loaded, we can access the square element
document.addEventListener("DOMContentLoaded", async () => {
  const element = document.querySelector(".square");

  // the animate method is a property of the element
  // 1st arg: keyframes 2nd arg: options
  const squareAnimation = element.animate(
    [
      {
        transform: "translateX(0) rotate(0deg) scale(10%)",
      },
      {
        // offset is the time in the animation - @ 80% through animation this object will be fully applied
        backgroundColor: "black",
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
      iterations: 2, // number of times the animation will repeat ie Infinity, 0, 1, 2, etc
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

  // square 3 animation
  const element3 = document.querySelector(".square-3");
  element3.animate(
    [
      {
        backgroundColor: "red",
      },
      { backgroundColor: "yellow" },
    ],
    {
      duration: 2000,
      direction: "alternate",
      iterations: Infinity,
    }
  );

  function generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  }

  function generateRandomScale() {
    return `${100 * (Math.floor(Math.random() * 5) + 1)}`;
  }

  // Event listener to pause the animation
  const playerButtons = document.querySelectorAll(".button");
  playerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const randomColor = generateRandomColor();
      //   console.log("randomColor => ", randomColor);
      const randomColor2 = generateRandomColor();
      //   console.log("randomColor => ", randomColor);
      const randomScale = generateRandomScale();
      const randomScale2 = generateRandomScale();

      // X
      const screenWidth = window.innerWidth;
      //   console.log("screenWidth", screenWidth);
      const randomScaleFixX = screenWidth - randomScale2 / 2;
      //   console.log("randomScaleFix", randomScaleFixX);
      // Y
      const screenHeight = window.innerHeight;
      //   console.log("screenWidth", screenHeight);
      const randomScaleFixY = screenHeight - randomScale2 / 2;
      //   console.log("randomScaleFixY", randomScaleFixY);
      // Twweaking Y behaviors
      const resultantY = Math.floor(Math.random() * randomScaleFixY);

      if (button.classList.contains("play")) {
        squareAnimation.currentTime = currentTimeInput.value;
        const playButtonStartTime = startTimeInput.value;
        squareAnimation.startTime = playButtonStartTime;
        squareAnimation.play();
        console.log("pending after play: ", squareAnimation.pending);
        squareAnimation.ready.then(() => {
          // will output "running"
          console.log("playState after play(): ", squareAnimation.playState);
        });
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
        squareAnimation.ready.then(() => {
          // will output "idle" - there is no currentTime and there are no pending tasts
          console.log("playState after cancel(): ", squareAnimation.playState);
        });
      }
      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }
      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }
      if (button.classList.contains("changeAnimation")) {
        squareAnimation.effect.setKeyframes([
          {
            transform: `translate(0, 0) rotate(0deg) scale(100%)`,
            backgroundColor: randomColor,
          },
          {
            // offset is the time in the animation - @ 80% through animation this object will be fully applied
            offset: 0.5,
            composite: "replace",
            borderRadius: "50%",
            easing: "ease-in-out",
          },
          {
            transform: `translate(${randomScaleFixX}px, ${resultantY}px) rotate(360deg) scale(${randomScale2}%)`,
            backgroundColor: randomColor2,
          },
        ]);
      }
      if (button.classList.contains("logInfo")) {
        let printOuts = [
          `currentTime, startTime, playbackRate & playState belong to the Animation Object:`,
          `currentTime: ${squareAnimation.currentTime} ms`,
          `startTime: ${squareAnimation.startTime} ms`,
          `playbackRate: ${squareAnimation.playbackRate} X`,
          `playState: ${squareAnimation.playState}`,
          `getKeyframes, getTiming & getComputedTiming belong to the Keyframe Effect`,
          `getKeyframes: ${JSON.stringify(
            squareAnimation.effect.getKeyframes()
          )}`,
          `getTiming: ${JSON.stringify(squareAnimation.effect.getTiming())}`,
          `getComputedTiming: ${JSON.stringify(
            squareAnimation.effect.getComputedTiming()
          )}`,
        ];
        // print the info to console as well
        console.log(printOuts);

        const uL = document.getElementById("results");
        uL.innerHTML = "";
        for (let i = 0; i < printOuts.length; i++) {
          const newLi = document.createElement("li");
          newLi.textContent = printOuts[i];
          uL.appendChild(newLi);
        }

        console.log("currentTime: ", squareAnimation.currentTime);
        console.log("startTime", squareAnimation.startTime);
        console.log("playbackRate", squareAnimation.playbackRate);
        console.log("playState", squareAnimation.playState);
        console.log("Keyframes", squareAnimation.effect.getKeyframes());
        console.log("Timing", squareAnimation.effect.getTiming());
        console.log(
          "Computed Timing",
          squareAnimation.effect.getComputedTiming()
        );

        // .endTime is the end of the computed animation ...
        // delay + (iterations * time for one cycle)
        //
        // this can be used to set the starting position for the animation
        // essentially we are saying, start at 100% complete here:
        // squareAnimation.currentTime = 3000;
        const percentCompleteOutput =
          document.getElementById("percentComplete");
        const endingTime = squareAnimation.effect.getComputedTiming().endTime;

        let percentageTime = Math.floor(
          (Number(squareAnimation.currentTime) / Number(endingTime)) * 100
        );
        percentCompleteOutput.textContent = percentageTime;
        console.log("Percentage Complete", percentageTime);
      }
    });
  });

  const playbackRateInput = document.getElementById("playbackRateInput");
  const playbackRateInputValue = document.getElementById(
    "playbackRateInputValue"
  );
  playbackRateInput.value = squareAnimation.playbackRate;
  playbackRateInputValue.value = squareAnimation.playbackRate;

  playbackRateInput.addEventListener("input", (event) => {
    playbackRate = event.target.value;
    // updatePlaybackRate is a native function that the animation player comes with
    squareAnimation.updatePlaybackRate(playbackRate);

    playbackRateInputValue.value = squareAnimation.playbackRate;
  });

  const durationInput = document.getElementById("durationInput");
  const durationOutput = document.getElementById("durationInputValue");

  durationInput.value = squareAnimation.effect.getComputedTiming.duration;
  durationOutput.value =
    squareAnimation.effect.getComputedTiming().duration + " ms";

  const infinityInput = document.getElementById("infinityInput");

  // check if iterations infinity is true, if yes, then checkbox is checked
  infinityInput.checked =
    squareAnimation.effect.getComputedTiming().iterations === Infinity;

  // updateTiming is a function that will take a new timing event object {{  key: integerValue }}
  // The value MUST be a Number, not a string!!!!
  durationInput.addEventListener("input", (event) => {
    const newDuration = Number(event.target.value);
    squareAnimation.effect.updateTiming({ duration: newDuration });
    durationOutput.textContent = newDuration;
  });

  // infinity mode isInfinite?
  // checkbox "change" => event.target.checked
  infinityInput.addEventListener("change", (event) => {
    squareAnimation.effect.updateTiming({
      iterations: event.target.checked ? Infinity : 2,
    });
  });

  const currentTimeInput = document.getElementById("currentTimeInput");

  currentTimeInput.addEventListener("input", (event) => {
    const newCurrentTime = Number(event.target.value);
    squareAnimation.currentTime = newCurrentTime;
  });

  const startTimeInput = document.getElementById("startTimeInput");

  startTimeInput.addEventListener("input", (event) => {
    const newStartTime = Number(event.target.value);
    squareAnimation.startTime = newStartTime;
  });

  const speedUp = document.getElementById("speedUp");
  const speedDown = document.getElementById("speedDown");
  speedUp.addEventListener("click", () => {
    const allAnimations = document.getAnimations();
    for (let i = 0; i < allAnimations.length; i++) {
      if (allAnimations[i].playbackRate < 2) {
        allAnimations[i].playbackRate += 0.2;
      }
    }
  });
  speedDown.addEventListener("click", () => {
    const allAnimations = document.getAnimations();
    for (let i = 0; i < allAnimations.length; i++) {
      if (allAnimations[i].playbackRate > 0) {
        allAnimations[i].playbackRate -= 0.2;
      }
    }
  });

  //   Because fill: both is resource intensive, we usually offload animations when they
  //   are complete. First we COMMIT the STYLES to the element, based on the COMPUTED_STYLES
  //   THIS DOES NOT REPLACE fill: forwards or fill: both IT IS USED WITH IT.
  //    this will write the styles into the elemet's attribute

  //   squareAnimation.addEventListener("finish", (event) => {
  //     squareAnimation.commitStyles();
  //     squareAnimation.cancel();
  //     element.style.transform = "translateX(100px)"; this works now because we have cancelled the animation taking precidence
  //   });

  // The browswer automatically removes forward filling animations to reduce memory leaks
  

  squareAnimation.pause();
  // playState
  console.log("playState after pause(): ", squareAnimation.playState);
  // pending
  console.log("pending after pause(): ", squareAnimation.pending);

  squareAnimation.ready.then(() => {
    console.log("Animation Ready");
    // playState after ready
    console.log("playState after ready: ", squareAnimation.playState);
    // pending
    console.log("pending after ready: ", squareAnimation.pending);
  });

  // because this play() immediately follow the pause() above, it means
  // the promise created by pause() will be resolved almost immediately.
  // The ready promise doesn't have time to settle in a pending state.
  // NOTICE - how this play() begins and these logs occur before the
  // anim.ready.then above resolves

  // commenting out this play() line will change the console outputs
  squareAnimation.play(); // playState
  console.log("playState after play(): ", squareAnimation.playState);
  // pending
  console.log("pending after play(): ", squareAnimation.pending);

  // cancel does NOT have a promise - it only has an event
  // the event target is the element itself
  squareAnimation.addEventListener("cancel", (event) => {
    console.log("CANCEL event: ", event);
  });

  // finish is another promise - we can use then.... or await!
  // the event target is the element itself
  squareAnimation.addEventListener("finish", (event) => {
    console.log("FINISH event - promise resolved: ", event);
  });

  await squareAnimation.finished;
  // this will only run after the promise resolves.
  console.log("Finished");
  // document object has a list of the animations on the page.
  console.log("document.getAnimations(): ", document.getAnimations());
  // each element can use this method
  console.log("element.getAnimations(): ", element.getAnimations());
  // we can pass subtree: true to see animations on decendants of elements as well
  console.log(
    "element.getAnimations({ subtree: true }): ",
    element.getAnimations({ subtree: true })
  );
  console.log(
    "thesinglesquare.getAnimations({ subtree: true }): ",
    element3.getAnimations({ subtree: true })
  );
});
