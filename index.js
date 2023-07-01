const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action) {
        case 'list':
            const allContacts = await listContacts();
            return console.table(allContacts);
            break;
        case 'get':
            const contactById = await getContactById(id);
            return console.log(contactById);
            break;
        case 'remove':
            const removedContact = await removeContact(id);
            return console.log(removedContact);
            break;
        case 'add':
            const newContact = await addContact(name, email, phone);
            return console.log(newContact);
            break;
        default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);