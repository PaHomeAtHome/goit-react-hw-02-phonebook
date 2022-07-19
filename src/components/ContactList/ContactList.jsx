import { ContactListComponent } from 'components/ContactListComponent/ContactListComponent';

export const ContactList = ({ values, deleteContact }) => (
  <ul>
    {values.filter === ''
      ? values.contacts.map(contact => (
          <ContactListComponent
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      : values.contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(values.filter.toLowerCase())
          )
          .map(contact => (
            <ContactListComponent
              key={contact.id}
              contact={contact}
              deleteContact={deleteContact}
            />
          ))}
  </ul>
);
