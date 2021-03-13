import React from 'react';
import './App.css'
import { data } from './data';
import { LogiTree } from './LogiTree/LogiTree';

const App: React.FC = () => {
  return (
    <div id="app">
      <LogiTree data={data} />
    </div>
  )
}

export default App;
