const mongoose = require('mongoose');
const User = require('../models/users');
const Unit = require('../models/units');
const Ticket = require('../models/tickets');

let unitList = [];
let userList = [];
let ticketList = [];

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

// Using Promise
async function run() {
    await mongoose.connect('mongodb://localhost/hw4');

    await User.remove();
    console.log('All users removed.');

    await Unit.remove();
    console.log('All units removed.');

    await Ticket.remove()
    console.log('All tickets removed');

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

    await mongoose.disconnect();
}

run();