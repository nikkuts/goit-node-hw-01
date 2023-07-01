const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts () {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

async function getContactById (contactId) {
    const contacts = await listContacts();
    const contactById = contacts.find(item => item.id === contactId);
    return contactById || null;
};

async function removeContact (contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);

    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

async function addContact (name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    "id": nanoid(),
    "name": name,
    "email": email,
    "phone": phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact; 
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact, 
};
