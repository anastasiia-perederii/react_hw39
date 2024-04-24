import React, { useState, useEffect } from 'react';
import ContactForm from '../ContactsForm/index';
import styles from './Contacts.module.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();

      const contactsWithSplitName = data.map(contact => {
        const nameParts = contact.name.match(/(Mrs\.?|Mr\.?|Ms\.?|Miss\.?)?\s*(.*)/);

        const prefix = nameParts[1] || '';
        const restOfName = nameParts[2] || '';

        const [firstName, ...surnameParts] = restOfName.split(' ');
        const surname = surnameParts.join(' ');

        return {
          ...contact,
          name: `${prefix.trim()} ${firstName.trim()}`,
          surname: surname.trim()
        };
      });

      setContacts(contactsWithSplitName);
    } catch (error) {
      console.error('Error fetching contacts: ', error);
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={styles.contactsContainer}>
      <h1>Contacts</h1>
      <table className={styles.contactsTable}>
        <thead>
        <tr>
          <th>Ім'я</th>
          <th>Прізвище</th>
          <th>Телефон</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {contacts.map((contact, index) => (
          <tr key={`${contact.id}-${index}`}>
            <td>{contact.name}</td>
            <td>{contact.surname}</td>
            <td>{contact.phone}</td>
            <td><button onClick={() => handleDeleteContact(contact.id)}>Видалити</button></td>
          </tr>
        ))}
        </tbody>
      </table>
      <button onClick={toggleForm}>Додати контакт</button>
      {showForm && <ContactForm addContact={addContact} />}
    </div>
  );
};

export default Contacts;
