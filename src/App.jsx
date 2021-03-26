import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';

const Child = () => {
  const renders = useRef(1);
  console.log(`%cCHILD RENDER ${renders.current} STARTING...`, 'color: green');

  // Lazy Initializer #1
  const [stateHook, setStateHook] = useState(() => {
    const state = new Date().toLocaleString('pt-br');
    console.log('%cState Lazy initializer - (useState + InitialValue) = ' + state, 'color: green');
    return state;
  });

  useEffect(() => {
    console.log('%cuseEffect (UPDATE stateHook) ' + stateHook, 'color: #dbc70f');
  }, [stateHook]);

  useEffect(() => {
    console.log('%cuseEffect -> No Dependencies', 'color: #dbc70f');
    renders.current += 1;

    return () => {
      console.log('%cuseEffect (Cleanup) -> No Dependencies', 'color: #dbc70f');
    };
  });

  useEffect(() => {
    console.log('%cuseEffect -> Empty dependencies', 'color: #dbc70f');

    return () => {
      console.log('%cuseEffect (Cleanup) -> Empty dependencies', 'color: #dbc70f');
    };
  }, []);

  useLayoutEffect(() => {
    console.log('%cuseLayoutEffect', 'color: #e61a4d');

    return () => {
      console.log('%cuseLayoutEffect (Cleanup)', 'color: #e61a4d');
    };
  });

  console.log(`%cCHILD RENDER ${renders.current} ENDING...`, 'color: green');
  return (
    <div className="appChild">
      <span>Child Render {renders.current}x</span>
      <h1>Child Component</h1>
      State: {stateHook} <button onClick={() => setStateHook(new Date().toLocaleString('pt-br'))} style={{ fontSize: '20px' }}>Change Date State</button>
    </div>
  );
};

const App = () => {
  const renders = useRef(1);

  useEffect(() => {
    renders.current += 1;
  });

  console.log(`%cPARENT RENDER ${renders.current} STARTING...`, 'color: green');
  const [show, setShow] = useState(false);
  
  console.log('%cState Initializer - (useState + InitialValue) = ' + show, 'color: green');
  console.log(`%cPARENT RENDER ${renders.current} ENDING...`, 'color: green');

  return (
    <div className="App">
      <span>Parent Render {renders.current}x</span>
      <h1> React Hooks Flow</h1>
      
      {!show ? 
        <button style={{ fontSize: '30px' }} onClick={() => setShow(true)}>
          Render Child Component
        </button>
      :
       <>
        <button style={{ fontSize: '30px' }} onClick={() => setShow(false)}>
          Hide Child Component
        </button>

        <Child />
       </>
      }
    </div>
  );
};

export default App;