import React from 'react'
import './Card.css'

const Card = props => {

    let user = {}

    const editData = () => {
        props.showModal()
        user = {
            name:props.name,
            phone: props.phone,
            email:props.email,
            address:props.address,
            id:props.id
        }
        props.updateUser(user)
    }

  return (
    <>
    <div className='card'>
        <div className='data'>
            <div className='name child'>
                {props.name}
            </div>
            <div className='phone child'>
                {props.phone}
            </div>
            <div className='email child'>
                {props.email}
            </div>
            <div className='address child'>
                {props.address}
            </div>
        </div>
        
        <div className='buttons-container'>
            <button onClick={editData} className='buttons'>
                Edit
            </button>
            <button onClick={() => props.deleteData(props.id)} className='buttons'>
                Delete 
            </button>
        </div>
    </div>
    </>
  )
}

export default Card