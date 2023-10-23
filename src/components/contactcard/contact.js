import React from 'react';
import './contact.css';

function ContactCard({  index ,name, mobile, email, deleteContact, enableEdit}) {
return (
    <div className='contact-card'>
    <p className='contact-name m2'>👤 {name}</p>
    <p className='contact-mobile m2'>📞 {mobile}</p>
    <p className='contact-email m2'>📩 {email}</p>
    <span className='icon-delete' onClick={() => deleteContact(mobile)}>🗑️</span>
    <span className='icon-edit' onClick={() => enableEdit(index)}>✏️</span>
    </div>
);
}

export default ContactCard;