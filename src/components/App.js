import React, { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addToContacts = objectContact => {
    this.state.contacts.find(contact => contact.name === objectContact.name)
      ? alert(`${objectContact.name} is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, objectContact],
          };
        });
  };

  getFilterValue = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredData = e => {
    return this.state.filter
      ? this.state.contacts.filter(contact =>
          contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
        )
      : this.state.contacts;
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const filter = this.state.filter;
    const contacts = this.state.contacts;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addToContacts} />
        {contacts.length > 0 ? (
          <div>
            <h2>Contacts</h2>
            <Filter getFilterValue={this.getFilterValue} value={filter} />
            <ContactList
              contacts={this.getFilteredData()}
              onRemoveContact={this.removeContact}
            />
          </div>
        ) : (
          <h2>Your phonebook is empty, please add your first contact</h2>
        )}
      </>
    );
  }
}

export default App;
