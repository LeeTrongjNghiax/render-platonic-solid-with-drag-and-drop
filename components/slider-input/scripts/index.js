import clamp from "../../../scripts/maths/clamp.js";

const initiateSliderInput = () => {
  const sliderInputs = document.querySelectorAll(`.c-slider-input`);

  sliderInputs.forEach((sliderInput) => {
    const lowerBoundInput = sliderInput.querySelector(
      `.c-slider-input__input-lower`
    );

    if (!lowerBoundInput) throw new Error(`Lower bound input not found`);

    const upperBoundInput = sliderInput.querySelector(
      `.c-slider-input__input-upper`
    );

    if (!upperBoundInput) throw new Error(`Upper bound input not found`);

    const rangeInput = sliderInput.querySelector(
      `.c-slider-input__input-range`
    );

    if (!rangeInput) throw new Error(`Range input not found`);

    const rangeValue = sliderInput.querySelector(
      `.c-slider-input__input-range-value`
    );

    if (!rangeValue) throw new Error(`Range value not found`);

    rangeInput.min = +lowerBoundInput.value;

    lowerBoundInput.addEventListener(`input`, () => {
      rangeInput.min = +lowerBoundInput.value;
    });

    rangeInput.max = +upperBoundInput.value;

    upperBoundInput.addEventListener(`input`, () => {
      rangeInput.max = +upperBoundInput.value;
    });

    rangeValue.textContent = rangeInput.value;

    const normalizedValue = clamp({
      value: +rangeInput.value,
      min: +lowerBoundInput.value,
      max: +upperBoundInput.value
    });

    rangeValue.style.left = `${normalizedValue * 100}%`;

    rangeInput.addEventListener(`input`, () => {
      rangeValue.textContent = rangeInput.value;

      const normalizedValue = clamp({
        value: +rangeInput.value,
        min: +lowerBoundInput.value,
        max: +upperBoundInput.value
      });

      rangeValue.style.left = `${normalizedValue * 100}%`;
    });
  });
}

document.addEventListener(`DOMContentLoaded`, initiateSliderInput);
