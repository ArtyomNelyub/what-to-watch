import React from 'react';
import Main from './main/main';
import { mockMainPosterProp } from '../mocks/main-film-poster';

function App() {
  return <div className='App'>{<Main {...mockMainPosterProp} />}</div>;
}

export default App;
