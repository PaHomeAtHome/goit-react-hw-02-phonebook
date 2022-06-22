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
  number: Yup.number().required(),
});

const initialValues = {
    contacts: [],
    name: '',
    number: ''
};

export const ContactBook = () => {
    const handleSubmit = (values, { resetForm }) => {
        const { name, number } = values;
        const contact = {
            name: [name],
            number: [number],
            id: nanoid()
        }
        values.contacts.push(contact)
        console.log(values.contacts)

        resetForm();
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
                            <Field name="name" type="text" placeholder="Full name" pattern={NAME_INPUT_PATTERN} title={NAME_INPUT_TITLE} />
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
                        {values.contacts.map(contact => {
                            return <p key={contact.id}>{contact.name}: {contact.number} ({contact.id})</p>
                        })
                        }
                
                </Form>)}
            </Formik>
        );
    };