import React, { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import "./ContactDetails.css";
import {CiCircleInfo} from 'react-icons/ci';

const ContactDetails = () => {
  const [data, setData] = useState([]);
  const [exists, setExists] = useState(true);
  const person = {
    id: 0,
    name: "",
    phone: "",
    email: "",
    address: "",
  };

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch(console.log);
  }, []);

  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState({});

  const deleteData = (id) => {
    setData(data.filter((data) => data.id !== id));
  };

  const showModal = () => setShow(!show);

  const newUser = (createdUser) => {
    setData((prevData) => {
      return [...prevData, createdUser];
    });
  }; 
  
  const existingUser = (user) => {
    const newArray = data.map((item, i) => {
      if (item.id === user.id) {
        return { ...item, name: user.name, phone: user.phone, email: user.email, address: user.address };
      } else {
        return item;
      }
    });
    setData(newArray);
    showModal();
  };

  const updateUser = (data) => {
    setEditUser(data);
    setExists(true);
  };

  return (
    <>
      <div className="contact-details-table">
      <span class="myDIV"> <CiCircleInfo /></span>
          <div class="hide">
            <ul>Known Bugs:</ul>
            <li>Profile pictures not available</li>
            <li>Data is not available as currently server is unable to run simultaneously <br /> &nbsp;&nbsp;&nbsp;&nbsp; To be able to see the functionality of User Detail kindly add a contact using "Add Contact" button</li>
          </div>
        <div className="header">
          <h1 > User Detail  </h1> 
          <button
            onClick={() => {
              setShow(true);
              setExists(false);
            }}
            className='add-button'
          >
            {" "}
            Add Contact{" "}
          </button>
          
        </div>
        

        {data &&
          data.map((element) => {
            return (
              <Card
                key={element.id}
                id={element.id}
                name={element.name}
                phone={element.phone}
                email={element.email}
                address={element.address}
                showModal={showModal}
                deleteData={deleteData}
                updateUser={updateUser}
              />
            );
          })}

        {show && (
          <Modal
            displayValue={newUser}
            existingUser = {existingUser}
            showModal={showModal}
            element={person}
            updatedUser={editUser}
            // allUsers={data}
            checkExists={exists}
          />
        )}
      </div>
    </>
  );
};

export default ContactDetails;
