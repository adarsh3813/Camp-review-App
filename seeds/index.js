const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '632c34e552876c91c3bb90ef',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Yellowstone National Park is in the U.S. states of Wyoming, Idaho, and Montana. It became the first National Park in 1872. There are geysers and hot springs at Yellowstone. There are also many animals at Yellowstone. There are elk, bison, sheep, grizzly bears, black bears, moose, coyotes, and more. More than 3 million people visit Yellowstone National Park each year.",
      price,
      geometry: { type: 'Point', coordinates: [ 88.363881, 22.572672 ] },
      images: [
        {
          url: 'https://res.cloudinary.com/dspnt0kqb/image/upload/v1664262304/YelpCamp/fgwpkzhhm7oggzmdbyry.jpg',
          filename: 'YelpCamp/fgwpkzhhm7oggzmdbyry',
        },
        {
          url: 'https://res.cloudinary.com/dspnt0kqb/image/upload/v1664262305/YelpCamp/qrobik4efq86ekorowh6.jpg',
          filename: 'YelpCamp/qrobik4efq86ekorowh6',
        },
        {
          url: 'https://res.cloudinary.com/dspnt0kqb/image/upload/v1664262310/YelpCamp/k3wzzwg9amyxr2dg3zjr.jpg',
          filename: 'YelpCamp/k3wzzwg9amyxr2dg3zjr',
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
