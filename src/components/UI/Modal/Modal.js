import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  let user = {
    "id": id,
    "name" : name,
    "phone": phone,
    "email" : email,
    "address" : address
  }
  var validRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const submitHandler = (e) => {
    if(name.trim() == ""){
      alert('Please enter a Name');
      return;
    }
    if(!phone.match(phoneno)){
      alert('Please enter a valid Phone number');
      return;
    }
    if(!email.match(validRegex)){
      alert('Please enter a valid email');
      return;
    }
    if(address.trim() == ""){
      alert('Please enter an address');
      return;
    }

    if(props.checkExists === true){
      props.existingUser(user)
    }
    else{
      props.displayValue(user) // save created user
      props.showModal();
    }
  };

  const closeHandler = (e) => {
      setId(0);
      setName('');
      setPhone('')
      setEmail('');
      setAddress('');
      props.showModal();
    };

  useEffect(()=>{
    if(props.checkExists === true){
      setId(props.updatedUser.id)
      setName(props.updatedUser.name);
      setPhone(props.updatedUser.phone);
      setEmail(props.updatedUser.email);
      setAddress(props.updatedUser.address);
    }
    if(props.checkExists !== true){
      setName('');
      setPhone('')
      setEmail('');
      setAddress('');
      setId(Math.random().toString());
    }
  },[props.updatedUser])
  

  return (
    <>
    <div className="backdrop">
    <div className="modal">
      <span className="heading">Enter Information</span>
      <div className="create-field">
        <label>Enter Name</label>
        <input onChange={(e) => setName(e.target.value)} value={name}/>
      </div>
      <div className="create-field">
        <label>Enter Contact Number</label>
        <input onChange={(e) => setPhone(e.target.value)} value={phone} type='number'/>
      </div>
      <div className="create-field">
        <label>Enter Email</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email}/>
      </div>
      <div className="create-field">
        <label>Enter Address</label>
        <input onChange={(e) => setAddress(e.target.value)} value={address}/>
      </div>

      <button onClick={closeHandler} className='buttons close-btn'>Close</button>
      <button onClick={submitHandler} className='buttons save-btn'>Save</button>
      
    </div>
    </div>
    </>
  );
};

export default Modal;
