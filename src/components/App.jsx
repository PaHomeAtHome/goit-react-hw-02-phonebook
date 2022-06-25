import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import Container from './Container/Container';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {

  state = {
    contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',

  };

  handleSubmit = ({ name, number }, {resetForm }) => {
    
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
            return;
        }

    const contact = {
       name,
        number,
        id: nanoid(),
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));

    resetForm();
    return;
  };

  filterContacts = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  
   deleteContact = (id) => {

      this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
      return;
    }

  render() {

    return <Container>
      <h2>Phonebook</h2>
      <ContactForm handleSubmit={this.handleSubmit} />

      <h2>Contacts</h2>
      <Filter filterContacts={this.filterContacts} />
      <ContactList values={this.state} deleteContact={this.deleteContact} />
    </Container>
  }
};
