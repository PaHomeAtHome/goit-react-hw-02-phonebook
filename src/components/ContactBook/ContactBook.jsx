import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { nanoid } from 'nanoid'

const NAME_INPUT_TITLE = "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const NAME_INPUT_PATTERN = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const NUMBER_INPUT_TITLE = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"

const ErrorText = styled.p`
  color: red;
`;

const Element = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Button = styled.button`
margin-left: 10px;
color: white;
background-color: #CC000099;
cursor: pointer;
border: 1px solid grey;
border-radius: 5px;`

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const validationSchema = Yup.object({
  name: Yup.string().required(),
  number: Yup.string().required(),
});

const initialValues = {
    contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: ''
};

export const ContactBook = () => {
    const handleSubmit = (values, { resetForm }) => {

        const { name, number } = values;

        if (values.contacts.find(contact => contact.name === name)) {
            alert(name + ' is already in contacts');
            return;
        }
            const contact = {
            name,
            number,
            id: nanoid(),
        }

        values.contacts.push(contact)

        resetForm();
        return;
    }

    const filterContacts = (values) => {
        values.filter = values.target.value;
        return;
    }

    const deleteContact = (values, id) => {

        values.contacts = values.contacts.filter((contact) => contact.id !== id);
        console.log(values.contacts);
        return;
    }

        return (
            <Formik
                
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                <Form autoComplete="off">
                    <h2>Phonebook</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <div>
                            <Field name="name" type="text" placeholder="Name" pattern={NAME_INPUT_PATTERN} title={NAME_INPUT_TITLE} />
                            <FormError name="name" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="number">Number</label>
                        <div>
                            <Field name="number" type="tel" placeholder="Number" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" title={NUMBER_INPUT_TITLE} />
                            <FormError name="number" />
                        </div>
                    </div>
                    <button type="submit">Add contact</button>
                        <h2>Contacts</h2>
                        <label htmlFor="filter">Find contacts by name</label>
                        <div><Field name="filter" type="text" placeholder="Name" pattern={NAME_INPUT_PATTERN} title={NAME_INPUT_TITLE} onInput={filterContacts}/></div>

                        {values.filter === '' ? values.contacts.map((contact, index)=> <Element key={contact.id}><p>{contact.name}: {contact.number}</p><Button type="button" onClick={() => deleteContact(values, contact.id)} value={index}>Delete</Button></Element>
                        )
                            
                        : values.contacts.filter(contact => contact.name.toLowerCase().includes(values.filter.toLowerCase()))
                        .map(contact => <p key={contact.id}>{contact.name}: {contact.number}</p>)}
                
                </Form>)}
            </Formik>
        );
    };