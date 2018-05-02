require('dotenv').config({path: '/Users/mahdi/eclipse-workspace/techit-server-node/.env'});
const mongoose = require('mongoose');

const User = require('../models/users');
const Unit = require('../models/units');
const Ticket = require('../models/tickets');
const Update = require('../models/updates');
const tickets_xref_technicians = require('../models/tickets_xref_technicians');


let unitList = [];
let userList = [];
let ticketList = [];
let updateList = [];
let ticketXrefTechList = [];

let unit1 = new Unit({
    id: 1,
    name: 'cs'
});

let unit2 = new Unit({
    id: 2,
    name: 'me'
});
unitList.push(unit1);
unitList.push(unit2);


let user1 = new User({
    id: 1,
    username: 'techit',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Test',
    unitId: 1,
    firstName: 'Techit',
    lastName: 'Admin',
    email: 'admin@techit.com',
    phoneNumber: '696-969-6969',
    //position: 'SYS_ADMIN',
    position : 0,
    enabled: 1
});
userList.push(user1);

let user2 = new User({
    id: 2,
    username: 'amgarcia',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Test',
    unitId: 1,
    firstName: 'Andrew',
    lastName: 'Garcia',
    email: 'test@techit.com',
    phoneNumber: '323-224-5678',
    //position: 'SUPERVISING_TECHNICIAN',
    position : 1,
    enabled: 1
});
userList.push(user2);

let user3 = new User({
    id: 3,
    username: 'rsanchez',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Test',
    unitId: 2,
    firstName: 'Rick',
    lastName: 'Sanchez',
    email: 'test@gmail.com',
    phoneNumber: '626-234-9999',
    //position: 'TECHNICIAN',
    position : 2,
    enabled: 1
});
userList.push(user3);

let user4 = new User({
    id: 4,
    username: 'peter',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Test',
    unitId: 2,
    firstName: 'peter',
    lastName: 'piper',
    email: 'hello@gmail.com',
    phoneNumber: '562-234-9876',
    //position: 'USER',
    position : 3,
    enabled: 1
});
userList.push(user4);

let user5 = new User({
    id: 5,
    username: 'mshakibi',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Test',
    unitId: 1,
    firstName: 'Mahdi',
    lastName: 'Shakibi',
    email: 'mshakibi@techit.com',
    phoneNumber: '626-417-3378',
    //position: 'TECHNICIAN',
    position : 2,
    enabled: 1
});
userList.push(user5);

let user6 = new User({
    id: 6,
    username: 'jcota',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Joe',
    unitId: 2,
    firstName: 'Cota',
    lastName: 'Sanchez',
    email: 'jcota@techit.com',
    phoneNumber: '333-333-3333',
    //position: 'TECHNICIAN',
    position : 2,
    enabled: 1
});
userList.push(user6);

let user7 = new User({
    id: 7,
    username: 'jdoe',
    hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
    department: 'Test',
    unitId: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jdoe@techit.com',
    phoneNumber: '444-444-44449',
    //position: 'USER',
    position : 3,
    enabled: 1
});
userList.push(user7);

let ticket1 = new Ticket({
    id : 1,
    completionDetails : 'This was completed after a few months.',
    createdDate : '2017-06-14 00:00:00',
    details : 'This ticket should be completed.',
    endDate : '2018-04-05 00:00:00',
    lastUpdated : '2018-04-02 00:00:00',
    location : 'Library 4th Floor',
    priority : 1,
    startDate : '2018-01-02 00:00:00',
    status : 3,
    subject : 'Test Ticket 1',
    createdById : 2,
    unitId : 1
});
ticketList.push(ticket1);

let ticket2 = new Ticket({
    id : 2,
    createdDate : '2018-02-14 00:00:00',
    details : 'Some description',
    lastUpdated : '2018-03-05 00:00:00',
    location : 'E&T A309',
    priority : 0,
    startDate : '2018-03-02 00:00:00',
    status : 1,
    subject : 'Test Ticket 2',
    createdById : 3,
    unitId : 1
});
ticketList.push(ticket2);

let ticket3 = new Ticket({
    id : 3,
    createdDate : '2018-02-14 00:00:00',
    details : 'Some description',
    location : 'Salazar Hall Entrance',
    priority : 0,
    status : 0,
    subject : 'Test Ticket 3',
    createdById : 3,
    unitId : 2
});
ticketList.push(ticket3);

let ticket4 = new Ticket({
    id : 4,
    completionDetails : 'This was completed after a few months.',
    createdDate : '2017-06-14 00:00:00',
    details : 'This ticket should be completed.',
    endDate : '2018-04-05 00:00:00',
    lastUpdated : '2018-04-02 00:00:00',
    location : 'Library 4th Floor',
    priority : 1,
    startDate : '2018-01-02 00:00:00',
    status : 3,
    subject : 'Test Ticket 4',
    createdById : 1,
    unitId : 1
});
ticketList.push(ticket4);

let ticket5 = new Ticket({
    id : 5,
    completionDetails : 'This was completed after a few months.',
    createdDate : '2017-06-14 00:00:00',
    details : 'This ticket should be completed.',
    endDate : '2018-04-05 00:00:00',
    lastUpdated : '2018-04-02 00:00:00',
    location : 'Library 4th Floor',
    priority : 1,
    startDate : '2018-01-02 00:00:00',
    status : 3,
    subject : 'Test Ticket 5',
    createdById : 2,
    unitId : 1
});
ticketList.push(ticket5);

let ticket6 = new Ticket({
    id : 6,
    completionDetails : 'This was completed after a few months.',
    createdDate : '2017-06-14 00:00:00',
    details : 'This ticket should be completed.',
    endDate : '2018-04-05 00:00:00',
    lastUpdated : '2018-04-02 00:00:00',
    location : 'Library 4th Floor',
    priority : 1,
    startDate : '2018-01-02 00:00:00',
    status : 3,
    subject : 'Test Ticket 6',
    createdById : 3,
    unitId : 1
});
ticketList.push(ticket6);

let ticket7 = new Ticket({
    id : 7,
    completionDetails : 'This was completed after a few months.',
    createdDate : '2017-06-14 00:00:00',
    details : 'This ticket should be completed.',
    endDate : '2018-04-05 00:00:00',
    lastUpdated : '2018-04-02 00:00:00',
    location : 'Library 4th Floor',
    priority : 1,
    startDate : '2018-01-02 00:00:00',
    status : 3,
    subject : 'Test Ticket 7',
    createdById : 4,
    unitId : 1
});
ticketList.push(ticket7);

let update1 = new Update({
    modifiedDate : '2018-02-10', 
    updateDetails: 'details of stuff',
    modifiedById: 1,
    ticketId: 1
});
updateList.push(update1);

let update2 = new Update({
    modifiedDate : '2018-11-23', 
    updateDetails: 'stuff is in the details',
    modifiedById: 2,
    ticketId: 2
});
updateList.push(update2);


let update3 = new Update({
    modifiedDate : '2018-12-13', 
    updateDetails: 'there are some detailed stuff',
    modifiedById: 2,
    ticketId: 1
});
updateList.push(update3);

let tickets_xref_technicians1 = new tickets_xref_technicians({
    ticketId: 1,
    updateDetechnicianId:2
});
ticketXrefTechList.push(tickets_xref_technicians1);

let tickets_xref_technicians2 = new tickets_xref_technicians({
    ticketId: 2,
    updateDetechnicianId:2
});
ticketXrefTechList.push(tickets_xref_technicians2);

let tickets_xref_technicians3 = new tickets_xref_technicians({
    ticketId: 3,
    updateDetechnicianId:3
});
ticketXrefTechList.push(tickets_xref_technicians3);

let tickets_xref_technicians4 = new tickets_xref_technicians({
    ticketId: 3,
    updateDetechnicianId:4
});
ticketXrefTechList.push(tickets_xref_technicians4);




// Using Promise
async function run() {
    await mongoose.connect(process.env.DBURL);
    mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${process.env.DBURL}`));
    mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));
  
    await User.remove();
    console.log('All users removed.');

    await Unit.remove();
    console.log('All units removed.');

    await Ticket.remove()
    console.log('All tickets removed');
    
    await Update.remove()
    console.log('All updates removed');

    await tickets_xref_technicians.remove()
    console.log('All tickets_xref_technicians removed');


    console.log('\n');

    for (let i = 0; i < userList.length; i++) {
        let savedUser = userList[i];
        await savedUser.save();
        console.log(`New user saved: ${savedUser.id}.`);
    } 

    console.log('\n');

    for (let j = 0; j < unitList.length; j++) {
        let savedUnit = unitList[j];
        await savedUnit.save();
        console.log(`New unit saved: ${savedUnit.id}.`);
    } 

    console.log('\n');

    for(let k = 0; k < ticketList.length; k++){
        let savedTicket = ticketList[k];
        await savedTicket.save()
        console.log(`New ticket saved: ${savedTicket.id}.`);
    }

    console.log('\n');

    for(let k = 0; k < updateList.length; k++){
        let savedUpdate = updateList[k];
        await savedUpdate.save()
        console.log(`New Update saved: ${savedUpdate.modifiedDate}`);
    }
    console.log('\n');

    for(let k = 0; k < ticketXrefTechList.length; k++){
        let savedticketXrefTech = ticketXrefTechList[k];
        await savedticketXrefTech.save()
        console.log(`New savedticketXrefTech saved: ${savedticketXrefTech.ticketId}`);
    }

    await mongoose.disconnect();
}

run();