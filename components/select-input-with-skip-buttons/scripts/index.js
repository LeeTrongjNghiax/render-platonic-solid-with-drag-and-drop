const handleChangeSelectInput = (selectInput, direction = 1) => {
  let selectedIndex = selectInput.selectedIndex;

  if (direction === 1) {
    if (selectedIndex === selectInput.options.length - 1) selectedIndex = 0;
    else selectedIndex++;
  } else if (direction === -1) {
    if (selectedIndex === 0) selectedIndex = selectInput.options.length - 1;
    else selectedIndex--;
  }

  let isOptionDisabled = selectInput.options[selectedIndex].disabled;

  while (isOptionDisabled) {
    selectedIndex += direction;
    isOptionDisabled = selectInput.options[selectedIndex].disabled;
  }

  selectInput.value = selectInput.options[selectedIndex].value;
  selectInput.dispatchEvent(new Event(`change`));
}

const initiateSelectInputWithSkipButtons = () => {
  const selectInputWithSkipButtons = document.querySelectorAll(
    `.c-form__input-select-with-skip-buttons-container`
  );

  selectInputWithSkipButtons.forEach(selectInputWithSkipButton => {
    const previousButton = selectInputWithSkipButton.querySelector(
      `.c-form__input-select-previous-button`
    );

    if (!previousButton) throw new Error(`Previous button not found`);

    const nextButton = selectInputWithSkipButton.querySelector(
      `.c-form__input-select-next-button`
    );

    if (!nextButton) throw new Error(`Next button not found`);

    const selectInput = selectInputWithSkipButton.querySelector(
      `.c-form__input-select`
    );

    if (!selectInput) throw new Error(`Select input not found`);

    previousButton.addEventListener(`click`, () => {
      handleChangeSelectInput(selectInput, -1);
    });

    nextButton.addEventListener(`click`, () => {
      handleChangeSelectInput(selectInput, 1);
    });
  });
}

document.addEventListener(`DOMContentLoaded`, initiateSelectInputWithSkipButtons);
