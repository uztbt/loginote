import React, { useState } from 'react';
import './App.css'
import { data } from './data';
import { LogiTree } from './LogiTree/LogiTree';

const App: React.FC = () => {
  const [nodes, setNodes] = useState(data)
  return (
    <div id="app">
      <LogiTree nodes={nodes}/>
    </div>
  )
}

export default App;
