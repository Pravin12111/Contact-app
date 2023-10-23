import React, { useEffect, useState } from 'react';
import ContactCard from '../../components/contactcard/contact';
import './home.css';
import showToast from 'crunchy-toast';

function Home() {
    const initialContacts = [
        {
            name: 'ram',
            mobile: '7889922322',
            email: 'ram@gmail.com'
        },
        {
            name: 'shaam',
            mobile: '9889922322',
            email: 'sham@gmail.com'
        },
        {
            name: 'pravin',
            mobile: '8989922322',
            email: 'pravin@gmail.com'
        },
        {
            name: 'ashok',
            mobile: '8979972322',
            email: 'ashok@gmail.com'
        },
    ];

    const [contacts, setContacts] = useState(initialContacts);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [isEdit, setIsEdit] = useState(false);

    const addContact = () => {
        if (!name || !mobile || !email) {
            showToast('Name, mobile, and email are required', 'alert', 3000);
            return;
        }

        const obj = {
            name: name,
            mobile: mobile,
            email: email,
        };

        // Create a new array with the updated contact
        const newContacts = [...contacts, obj];
        setContacts(newContacts);
        saveToLocalStorage(newContacts);
        showToast('Contact added successfully', 'success', 3000);

        setName('');
        setMobile('');
        setEmail('');
    };

    const editContact = () => {
        if (!name || !mobile || !email) {
            showToast('Name, mobile, and email are required', 'alert', 3000);
            return;
        }

        const obj = {
            name: name,
            mobile: mobile,
            email: email
        };

        // Create a new array with the edited contact
        const newContacts = [...contacts];
        newContacts[editIndex] = obj;
        setContacts(newContacts);
        saveToLocalStorage(newContacts);
        showToast('Contact edited successfully', 'success', 3000);

        setName('');
        setMobile('');
        setEmail('');

        setIsEdit(false);
    };

    const deleteContact = (mobile) => {
        const newContacts = contacts.filter((contact) => contact.mobile !== mobile);
        setContacts(newContacts);
        saveToLocalStorage(newContacts);
        showToast('Contact deleted successfully', 'success', 3000);
    };

    const saveToLocalStorage = (contactDetail) => {
        localStorage.setItem('contacts', JSON.stringify(contactDetail));
    };

    const loadFromLocalStorage = () => {
        const contactDetail = JSON.parse(localStorage.getItem('contacts'));

        if (contactDetail) {
            setContacts(contactDetail);
        }
    };

    const enableEdit = (index) => {
        const contactDetail = contacts[index];
        setName(contactDetail.name);
        setMobile(contactDetail.mobile);
        setEmail(contactDetail.email);

        setEditIndex(index);
        setIsEdit(true);
    };

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    return (
        <div>
            <h1 className='app-title'>📞 Contact App</h1>
            <div className='app-body'>
                <div className='contact-container'>
                    <h2>Show Contacts</h2>
                    {contacts.map((contact, index) => (
                        <ContactCard
                            key={index} // Use a unique key for the contact
                            name={contact.name}
                            mobile={contact.mobile}
                            email={contact.email}
                            deleteContact={deleteContact}
                            enableEdit={()=>enableEdit(index)}
                        />
                    ))}
                </div>
                <div className='add-contact-container'>
                    <h2>{isEdit ? 'Edit Contact' : 'Add Contact'}</h2>
                    <form>
                        <input
                            type='text'
                            placeholder='Name'
                            className='user-input'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <input
                            type='text'
                            placeholder='Mobile'
                            className='user-input'
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            className='user-input'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button
                            type='button'
                            className='btn-add-contact'
                            onClick={isEdit ? editContact : addContact}
                        >
                            {isEdit ? 'Edit Contact' : 'Add Contact'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
