import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SetCode, SetCombination } from "../../store/actions/actions";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { GuessResult } from "../GuessResult/GuessResult";
import './Home.scss';

export const HomeComponent = () => {
  const { code, keyValue } = useSelector((state: any) => state.passwordReducer);
  const dispatch = useDispatch();
  const [tries, setTries] = useState(0);

  const initGame = useCallback(() => {
    setTries(0);
    let generatedCode = Math.floor(Math.random() * 10000).toString();
    // generated value could be 3 or 2-digit, this check makes sure code will contain 4 digits
    switch (generatedCode?.length) {
      case 3:
        generatedCode = `0${generatedCode}`
        break;
      case 2:
        generatedCode = `00${generatedCode}`
        break;
    
      default:
        break;
    }
    if (generatedCode?.length < 4) {
      generatedCode = `0${generatedCode}`
    }
    dispatch(SetCode(generatedCode));
    dispatch(SetCombination(''));
  }, [dispatch]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const guessCode = (value: string) => {
    dispatch(SetCombination(value));
    setTries(tries + 1);
  };

  return (
    <div className="container container-with-padding">
      {code !== keyValue && <div className="container">
        <p>Guess code game</p>
        <PasswordInput guessCode={guessCode} />
      </div>}
      <GuessResult code={code} value={keyValue} tries={tries} startNewGame={initGame} />
    </div>
  );
};