const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid/async')

const getJSON = require('./helpers/getJSON.js');
const appendJSON = require('./helpers/appendJSON.js')
const writeJSON = require('./helpers/writeJSON.js')


const contactsPath = path.normalize(path.resolve('./db/contacts.json'));


async function listContacts() {
  console.table(await getJSON(contactsPath));
};

async function getContactById(contactId) {
  contacts = await getJSON(contactsPath);
  let contact = contacts.filter(item => item.id === contactId);
  console.table(contact);
};

async function removeContact(contactId) {
  console.log('Removed Contact:');
  removedContact = await getContactById(contactId);

  contacts = await getJSON(contactsPath);
  newContacts = contacts.filter(item => item.id !== contactId);
  await writeJSON(newContacts, contactsPath);

  console.log('New contacts:')
  listContacts();
};

async function addContact(name, email, phone) {
  const normalize = (param) => {
    if (typeof (param) !== String) {
      return param.toString();
    }
    return param;
  }

  const data = {
    id: await nanoid(),
    name: normalize(name),
    email: normalize(email),
    phone: normalize(phone),
  }

  await appendJSON(data, contactsPath)
  listContacts();
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}