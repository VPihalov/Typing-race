import React, { useState, useEffect } from 'react';

const App = () => {

  const INITIAL_GAME_STATE = {
    victory: false,
    startTime: null,
    endTime: null
  };
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  }, [gameState.victory]);

  const updateUserText = event => {
    setUserText(event.target.value);

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
      setTimeout(() => {
        setUserText('')
      }, 1500)
    }
  };

  const chooseSnippet = snippetIndex => () => {
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({...gameState, startTime: new Date().getTime()})
  };

  return (
    <div>
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      <h4>{gameState.victory === true && `Done! Time: ${gameState.endTime/1000} s`}</h4>
        {snippet}
      <hr />
      <input value={userText} onChange={updateUserText} />
      <hr />
      {
        SNIPPETS.map((snippet, idx) => (
          <button onClick={chooseSnippet(idx)} key={idx}>
            {snippet.substring(0, 10)}...
          </button>
        ))
      }
    </div>
  );
}

export default App;