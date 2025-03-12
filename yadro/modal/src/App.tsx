import { useState } from 'react';
import './App.css';
import Modal from './Modal';

function App() {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleShow = () => setIsShow(!isShow);

  return (
    <>
      <button type="button" onClick={handleShow}>Open Modal</button>
      <Modal isShow={isShow} handleShow={handleShow} />
    </>
  )
}

export default App;
