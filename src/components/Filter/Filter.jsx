export const Filter = ({ filterContacts }) =>
    
    <div><p>Find contacts by name</p>
    <input name="filter" type="text" placeholder="Name" onChange={filterContacts} /></div>