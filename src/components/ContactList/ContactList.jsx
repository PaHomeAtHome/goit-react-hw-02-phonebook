import styled from 'styled-components';

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

export const ContactList = ({ values, deleteContact }) => 
    
    values.filter === '' ? values.contacts.map(contact => <Element key={contact.id}><p>{contact.name}: {contact.number}</p>
        <Button type="button" onClick={() => deleteContact(contact.id)} >Delete</Button></Element>)
                            
    : values.contacts.filter(contact => contact.name.toLowerCase().includes(values.filter.toLowerCase()))
        .map(contact => <Element key={contact.id}><p>{contact.name}: {contact.number}</p>
        <Button type="button" onClick={() => deleteContact(contact.id)} >Delete</Button></Element>)