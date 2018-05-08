require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/user');
const Unit = require('../models/unit');
const Ticket = require('../models/ticket');

const units = [
    {
        // id: 1,
        _id: '5aefc78a513d8023e4f53666',
        name: 'cs'
    },
    {
        // id: 2,
        _id: '5aefc78a513d8023e4f53667',
        name: 'me'
    }
];

const users = [
    {
        // id: 1,
        _id: '5aefc78a513d8023e4f53668',
        username: 'techit',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Test',
        unit: units[0]._id,
        firstName: 'Techit',
        lastName: 'Admin',
        email: 'admin@techit.com',
        phoneNumber: '696-969-6969',
        position: 'SYS_ADMIN',
        enabled: true
    },
    {
        // id: 2,
        _id: '5aefc78a513d8023e4f53669',
        username: 'amgarcia',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Test',
        unit: units[0]._id,
        firstName: 'Andrew',
        lastName: 'Garcia',
        email: 'test@techit.com',
        phoneNumber: '323-224-5678',
        position: 'SUPERVISING_TECHNICIAN',
        enabled: true
    },
    {
        // id: 3,
        _id: '5aefc78a513d8023e4f5366a',
        username: 'rsanchez',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Test',
        unit: units[1]._id,
        firstName: 'Rick',
        lastName: 'Sanchez',
        email: 'test@gmail.com',
        phoneNumber: '626-234-9999',
        position: 'TECHNICIAN',
        enabled: true
    },
    {
        // id: 4,
        _id: '5aefc78a513d8023e4f5366b',
        username: 'peter',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Test',
        unit: units[1]._id,
        firstName: 'peter',
        lastName: 'piper',
        email: 'hello@gmail.com',
        phoneNumber: '562-234-9876',
        position: 'USER',
        enabled: true
    },
    {
        // id: 5,
        _id: '5aefc78a513d8023e4f5366c',
        username: 'mshakibi',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Test',
        unit: units[0]._id,
        firstName: 'Mahdi',
        lastName: 'Shakibi',
        email: 'mshakibi@techit.com',
        phoneNumber: '626-417-3378',
        position: 'TECHNICIAN',
        enabled: true
    },
    {
        // id: 6,
        _id: '5aefc78a513d8023e4f5366d',
        username: 'jcota',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Joe',
        unit: units[1]._id,
        firstName: 'Cota',
        lastName: 'Sanchez',
        email: 'jcota@techit.com',
        phoneNumber: '333-333-3333',
        position: 'TECHNICIAN',
        enabled: true
    },
    {
        // id: 7,
        _id: '5aefc78a513d8023e4f5366e',
        username: 'jdoe',
        hash: '$2a$10$Xm5I2iYA/4vZytuGpVIro.zUAHGG0eAAcY2.aX20kRcM8u7AEmFom',
        department: 'Test',
        unit: units[0]._id,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jdoe@techit.com',
        phoneNumber: '444-444-44449',
        position: 'USER',
        enabled: true
    }
];

const tickets = [
    {
        // id: 1,
        _id: '5aefc49e7b7237284842d6e0',
        completionDetails: 'This was completed after a few months.',
        createdDate: '2017-06-14 00:00:00',
        details: 'This ticket should be completed.',
        endDate: '2018-04-05 00:00:00',
        lastUpdated: '2018-04-02 00:00:00',
        location: 'Library 4th Floor',
        priority: 'LOW',
        startDate: '2018-01-02 00:00:00',
        status: 'COMPLETED',
        subject: 'Test Ticket 1',
        createdBy: users[1]._id,
        unit: units[0]._id,
        technicians: [
            users[1]._id
        ],
        updates: [
            {
                modifiedBy: users[0]._id,
                modifiedDate: '2018-02-10', 
                updateDetails: 'details of stuff'
            },
            {
                modifiedBy: users[1]._id,
                modifiedDate: '2018-12-13', 
                updateDetails: 'there are some detailed stuff'
            }
        ]
    },
    {
        // id: 2,
        _id: '5aefc78a513d8023e4f53670',
        createdDate: '2018-02-14 00:00:00',
        details: 'Some description',
        lastUpdated: '2018-03-05 00:00:00',
        location: 'E&T A309',
        priority: 'NOT_ASSIGNED',
        startDate: '2018-03-02 00:00:00',
        status: 'IN_PROGRESS',
        subject: 'Test Ticket 2',
        createdBy: users[2]._id,
        unit: units[0]._id,
        technicians: [
            users[1]._id
        ],
        updates: [
            {
                modifiedBy: users[1]._id,
                modifiedDate: '2018-11-23', 
                updateDetails: 'stuff is in the details'
            }
        ]
    },
    {
        // id: 3,
        _id: '5aefc78a513d8023e4f53671',
        createdDate: '2018-02-14 00:00:00',
        details: 'Some description',
        location: 'Salazar Hall Entrance',
        priority: 'NOT_ASSIGNED',
        status: 'OPEN',
        subject: 'Test Ticket 3',
        createdBy: users[2]._id,
        unit: units[1]._id,
        technicians: [
            users[2]._id,
            users[3]._id
        ],
        updates: []
    },
    {
        // id: 4,
        _id: '5aefc78a513d8023e4f53672',
        completionDetails: 'This was completed after a few months.',
        createdDate: '2017-06-14 00:00:00',
        details: 'This ticket should be completed.',
        endDate: '2018-04-05 00:00:00',
        lastUpdated: '2018-04-02 00:00:00',
        location: 'Library 4th Floor',
        priority: 'LOW',
        startDate: '2018-01-02 00:00:00',
        status: 'COMPLETED',
        subject: 'Test Ticket 4',
        createdBy: users[0]._id,
        unit: units[0]._id,
        technicians: [],
        updates: []
    },
    {
        // id: 5,
        _id: '5aefc78a513d8023e4f53673',
        completionDetails: 'This was completed after a few months.',
        createdDate: '2017-06-14 00:00:00',
        details: 'This ticket should be completed.',
        endDate: '2018-04-05 00:00:00',
        lastUpdated: '2018-04-02 00:00:00',
        location: 'Library 4th Floor',
        priority: 'LOW',
        startDate: '2018-01-02 00:00:00',
        status: 'COMPLETED',
        subject: 'Test Ticket 5',
        createdBy: users[1]._id,
        unit: units[0]._id,
        technicians: [],
        updates: []
    },
    {
        // id: 6,
        _id: '5aefc78a513d8023e4f53674',
        completionDetails: 'This was completed after a few months.',
        createdDate: '2017-06-14 00:00:00',
        details: 'This ticket should be completed.',
        endDate: '2018-04-05 00:00:00',
        lastUpdated: '2018-04-02 00:00:00',
        location: 'Library 4th Floor',
        priority: 'LOW',
        startDate: '2018-01-02 00:00:00',
        status: 'COMPLETED',
        subject: 'Test Ticket 6',
        createdBy: users[2]._id,
        unit: units[0]._id,
        technicians: [],
        updates: []
    },
    {
        // id: 7,
        _id: '5aefc78a513d8023e4f53675',
        completionDetails: 'This was completed after a few months.',
        createdDate: '2017-06-14 00:00:00',
        details: 'This ticket should be completed.',
        endDate: '2018-04-05 00:00:00',
        lastUpdated: '2018-04-02 00:00:00',
        location: 'Library 4th Floor',
        priority: 'LOW',
        startDate: '2018-01-02 00:00:00',
        status: 'COMPLETED',
        subject: 'Test Ticket 7',
        createdBy: users[3]._id,
        unit: units[0]._id,
        technicians: [],
        updates: []
    }
];

const updates = [

];

// Using Promise
async function run() {
    await mongoose.connect(process.env.DBURL);
    mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${process.env.DBURL}`));
    mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));

    await Ticket.remove()
    console.log('All tickets removed');

    await User.remove();
    console.log('All users removed.');

    await Unit.remove();
    console.log('All units removed.');
    console.log();    

    for (const unit of units) {
        await new Unit(unit).save();
        console.log(`New unit saved: ${unit._id}.`);
    } 
    console.log();

    for (const user of users) {
        await new User(user).save();
        console.log(`New user saved: ${user._id}.`);
    }
    console.log();

    for(const ticket of tickets) {
        await new Ticket(ticket).save();
        console.log(`New ticket saved: ${ticket._id}.`)
    }

    await mongoose.disconnect();
}

run();