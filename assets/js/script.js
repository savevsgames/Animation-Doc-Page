document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");
  const street = document.querySelector(".street");
  const background = document.querySelector(".background");
  const foreground = document.querySelector(".foreground");
  const cloud = document.querySelector(".cloudmove");
  const shadow = document.querySelector(".shadow");

  const carWrapper = document.querySelector(".car-wrapper");

  const characterAnimation = character.animate(
    [
      {
        backgroundPosition: "0 0",
      },
      {
        backgroundPosition: "calc(var(--char-width) * -7) 0",
      },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: "steps(8, jump-none)",
    }
  );

  const streetAnimation = street.animate(
    [
      {
        transform: "translateX(0)",
      },
      {
        transform: "translateX(-50%)",
      },
    ],
    {
      duration: 2000,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const backgroundAnimation = background.animate(
    [
      {
        transform: "translateX(200%)",
      },
      {
        transform: "translateX(-200%)",
      },
    ],
    {
      duration: streetAnimation.effect.getComputedTiming().duration * 10,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const foregroundAnimation = foreground.animate(
    [
      {
        transform: "translateX(300%)",
      },
      {
        transform: "translateX(-300%)",
      },
    ],
    {
      duration: streetAnimation.effect.getComputedTiming().duration * 5,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const cloudAnimation = cloud.animate(
    [
      {
        transform: "translateX(300%)",
      },
      {
        transform: "translateX(-300%)",
      },
    ],
    {
      duration: streetAnimation.effect.getComputedTiming().duration * 50,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const shadowAnimationRun = shadow.animate(
    [
      {
        transform: "scaleX(1)",
      },
      {
        transform: "scaleX(0.8)",
      },
    ],
    {
      duration: 250,
      iterations: Infinity,
      easing: "linear",
      direction: "alternate",
    }
  );

  async function jump() {
    if (
      character.getAnimations().find((animation) => animation.id === "jump")
      // for each animation if we find an id of "jump" we return and dont trigger the jump() code
    ) {
      return;
    }
    if (characterAnimation.playState === "paused") {
      return;
    }
    characterAnimation.pause();
    character.classList.add("jump");
    const jumpAnimation = character.animate(
      [
        {
          transform: "translateY(0px)",
        },
        {
          transform: "translateY(-25rem)",
        },
      ],
      {
        id: "jump",
        duration: 500,
        iterations: 2,
        easing: "ease-in-out",
        direction: "alternate",
      }
    );
    const { duration, iterations, easing, direction } =
      jumpAnimation.effect.getComputedTiming();
    const shadowAnimationJump = shadow.animate(
      [
        {
          transform: "scaleX(1)",
        },
        {
          transform: "scaleX(0.5)",
        },
      ],
      { duration, iterations, easing, direction }
      // copied from jump animation - destructured from jump's computed Timing
    );

    console.log("jumping");
    await jumpAnimation.finished;
    character.classList.remove("jump");
    characterAnimation.play();
  }

  function togglePlaystate() {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === "running") {
        animation.pause();
      } else {
        animation.play();
      }
    });
    addNewCar();
  }

  function runFaster() {
    if (characterAnimation.playbackRate < 3) {
      document.getAnimations().forEach((animation) => {
        if (animation.id !== "carAnim") {
          animation.playbackRate *= 1.1;
        }
      });
    }
  }

  function runSlower() {
    if (characterAnimation.playbackRate > 0.5) {
      document.getAnimations().forEach((animation) => {
        if (animation.id !== "carAnim") {
          animation.playbackRate *= 0.9;
        }
      });
    }
  }

  // if the character is running fast for 5s straight, then auto slow it
  setInterval(() => {
    if (characterAnimation.playbackRate >= 1) {
      runSlower();
    }
  }, 5000);

  async function addNewCar() {
    if (
      streetAnimation.playState !== "running" ||
      document.querySelector(".car")
    )
      return;
    const newCar = document.createElement("div");
    newCar.classList.add("car");
    carWrapper.appendChild(newCar);

    const newCarAnimation = newCar.animate(
      [
        {
          transform: "translateX(-300vw)",
        },
        {
          transform: "translateX(300vw)",
        },
      ],
      {
        id: "carAnim",
        duration: Math.random() * 4000 + 3000,
        iterations: 1,
      }
    );
    // wheel
    newCar.animate(
      [
        {
          transform: "rotate(0)",
        },
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        id: "carAnim",
        pseudoElement: ":after",
        duration: newCarAnimation.effect.getComputedTiming().duration * 0.1,
        easing: "linear",
        iterations: Infinity,
      }
    );
    // wheel
    newCar.animate(
      [
        {
          transform: "rotate(0)",
        },
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        id: "carAnim",
        pseudoElement: ":before",
        duration: newCarAnimation.effect.getComputedTiming().duration * 0.1,
        easing: "linear",
        iterations: Infinity,
      }
    );

    await newCarAnimation.finished;
    carWrapper.removeChild(newCar);

    setTimeout(() => {
      if (streetAnimation.playState === "running") {
        addNewCar();
        // this will not fire if the scene is paused and resumed, so we need to add that functionality in togglePlayState
      }
    }, Math.random() * 10000 + 4000);
  }

  streetAnimation.ready.then(() => {
    if (streetAnimation.playState === "running") {
      addNewCar();
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        console.log(event, "jump");
        jump();
        break;
      case "ArrowRight":
        runFaster();
        break;
      case "ArrowLeft":
        runSlower();
        break;
      case "Space":
        console.log(event, "Game Paused");
        togglePlaystate();
        break;

      default:
        break;
    }
  });
});
