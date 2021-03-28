import React, { useState, useEffect } from 'react';
import './App.css';
import Heading from './components/Heading';
import Submissions from './components/Submission';
import Modal from './components/ModalComponent';
//DIFFERENT GET REQUEST! MORE PRECISELY BY ID 
interface FullSubmission {
  submission_id: number,
  title: string,
  submission: string
};

function App() {
  const [list, setList] = useState<FullSubmission[]>([]);
  const [isModalOpen, setModalState] = useState(false);
  const [selectedFullSubmission, setSelectedFullSubmission] = useState<FullSubmission | null>(null)

  const toggleModal = () => setModalState(!isModalOpen);


  const getSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const jsonData = await response.json();
      setList(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div className="App">
      <Heading />
      <Submissions getSubmissions={getSubmissions} />

      <div>
        {list.map((avacado) => {
          return (<div className="submission" key={avacado.submission_id}>
            <button
              className='modal_button'
              onClick={() => {
                setSelectedFullSubmission(avacado)
                toggleModal()
              }}
            >
              {avacado.title}
            </button>
          </div>
          )
        })}

        {`isModalOpen is ${isModalOpen}`}
        
        <Modal
          title={selectedFullSubmission ? selectedFullSubmission.title : "No snippet selected"}
          isOpen={isModalOpen}
          onClose={toggleModal} 
          submission={selectedFullSubmission ? selectedFullSubmission.submission : "No snippet selected"} />



      </div>

    </div>
  );
}

export default App;
