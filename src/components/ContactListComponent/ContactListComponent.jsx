import styled from 'styled-components';

const Element = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin-left: 10px;
  color: white;
  background-color: #cc000099;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 5px;
`;

export const ContactListComponent = ({ contact, deleteContact }) => (
  <Element>
    <p>
      {contact.name}: {contact.number}
    </p>
    <Button type="button" onClick={() => deleteContact(contact.id)}>
      Delete
    </Button>
  </Element>
);
