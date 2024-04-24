import React, { useState } from 'react';
import styles from './ContactsForm.module.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({ name, surname, phone });
    setName('');
    setSurname('');
    setPhone('');
  };

  return (
    <form className={styles['contact-form']} onSubmit={handleSubmit}>
      <label htmlFor="name">Ім'я:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="surname">Прізвище:</label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <label htmlFor="phone">Телефон:</label>
      <input
        type="text"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button type="submit">Зберегти</button>
    </form>
  );
};

export default ContactForm;
