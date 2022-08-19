import React from 'react';
import './GuessResult.scss';

const Dot = ({ isGuessed = false }: { isGuessed: boolean }) => (
  <div className="dot" style={{ backgroundColor: isGuessed ? 'white' : 'gray' }} />
);

export const GuessResult = React.memo((
  { code, value, tries, startNewGame }: { code: string, value: string, tries: number, startNewGame: () => void }
) => {
  if (!code?.length) return <></>
  return <div className='result-container'>
    {code === value ?
      <div>
        <p>Congratulations!</p>
        <p>Code: {code}</p>
        <p>Tries spent: {tries}</p>
        <button className='new-game-btn' onClick={startNewGame}>Start new game</button>
      </div>
      : <div className='results-row'>
        {code.split('').map((key, index) => <Dot key={`${index} ${key}`} isGuessed={key === value.split('')[index]} />)}
      </div>}
  </div>
});