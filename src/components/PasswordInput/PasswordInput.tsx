import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import './PasswordInput.scss';

interface InputInfo {
  ref: React.RefObject<HTMLInputElement>,
  value: string,
  setInputValue: Dispatch<SetStateAction<string>>,
  nextInputRef?: React.RefObject<HTMLInputElement>,
  prevInputRef?: React.RefObject<HTMLInputElement>,
};

export const PasswordInput = React.memo(({ guessCode }: { guessCode: (value: string) => void }) => {
  const [firstNumber, setFirstNumber] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [secondNumber, setSecondNumber] = useState('');
  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLInputElement>(null);
  const [thirdNumber, setThirdNumber] = useState('');
  const fourthInputRef = useRef<HTMLInputElement>(null);
  const [fourthNumber, setFourthumber] = useState('');

  const inputs: InputInfo[] = [
    { ref: firstInputRef, value: firstNumber, setInputValue: setFirstNumber, nextInputRef: secondInputRef },
    { ref: secondInputRef, value: secondNumber, setInputValue: setSecondNumber, nextInputRef: thirdInputRef, prevInputRef: firstInputRef },
    { ref: thirdInputRef, value: thirdNumber, setInputValue: setThirdNumber, nextInputRef: fourthInputRef, prevInputRef: secondInputRef },
    { ref: fourthInputRef, value: fourthNumber, setInputValue: setFourthumber, prevInputRef: thirdInputRef }
  ];

  useEffect(() => {
    if (firstNumber && secondNumber && thirdNumber && fourthNumber) {
      guessCode([firstNumber, secondNumber, thirdNumber, fourthNumber].join(''));
      inputs.forEach(input => input.setInputValue(''));
      firstInputRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstNumber, secondNumber, thirdNumber, fourthNumber]);

  const handleNumberInput = (
    key: string,
    setInputValue: Dispatch<SetStateAction<string>>,
    nextInput?: React.RefObject<HTMLInputElement>,
    prevInput?: React.RefObject<HTMLInputElement>
  ) => {
    if (Number(key) >= 0) {
      setInputValue(key);
      nextInput?.current?.focus();
      return;
    }
    if (key === 'Backspace') {
      setInputValue('');
      prevInput?.current?.focus();
    };
  };

  return <div className='input-container'>
    {inputs.map((input, index) => (
      <input
        key={index}
        ref={input.ref}
        type="number"
        maxLength={1}
        value={input.value}
        onKeyDown={({ key }: { key: string }) =>
          handleNumberInput(key, input.setInputValue, input?.nextInputRef, input?.prevInputRef)}
      />
    ))}
  </div>;
});
