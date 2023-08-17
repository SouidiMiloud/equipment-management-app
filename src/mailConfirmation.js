import React, {useRef} from 'react';
import './index.css';
import './mailConfirmation.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function MailConfirmation() {

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const moveNextInput = (event, inputIndex)=>{
    const value = event.target.value;
    if(value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57)
      inputRefs[inputIndex].current.focus();
    else
      event.target.value = '';
  }

  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="card py-5 px-3">
        <h5 className="m-0">vérifier votre mail</h5>
        <span className="mobile-text">veuillez taper le code envoyé à l'addresse mail <b className="text-danger">*************@inemail.ine.inpt.ma</b></span>
        <div className="d-flex flex-row mt-5">
          <input onChange={(event)=>moveNextInput(event, 0)} type="text" maxLength={1} className="form-control" autoFocus />
          <input ref={inputRefs[0]} onChange={(event)=>moveNextInput(event, 1)} type="text" maxLength={1} className="form-control" />
          <input ref={inputRefs[1]} onChange={(event)=>moveNextInput(event, 2)} type="text" maxLength={1} className="form-control" />
          <input ref={inputRefs[2]} onChange={(event)=>moveNextInput(event, 3)} type="text" maxLength={1} className="form-control" />
          <input ref={inputRefs[3]} onChange={(event)=>moveNextInput(event, 4)} type="text" maxLength={1} className="form-control" />
          <input ref={inputRefs[4]} onChange={(event)=>moveNextInput(event, 4)} type="text" maxLength={1} className="form-control" />
        </div>
        <div className="text-center mt-5">
          <span className="d-block mobile-text">Don't receive the code?</span>
          <span className="font-weight-bold text-danger cursor">Resend</span>
        </div>
      </div>
    </div> 
    
  );
}

export default MailConfirmation;