const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Database Connected!");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '60c79acde2ec3f7a7c8eb7b3',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates accusantium praesentium odio quisquam eligendi cupiditate! Culpa beatae nihil maiores magnam. Possimus cumque dolor optio odit ipsa, deserunt nulla labore quaerat.',
      price,
      geometry: {
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ],
        type: "Point"
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dt1mvgryx/image/upload/v1623957910/Yelp%20Camp/tnzljfuzyfjwb7weyipa.png',
          filename: 'Yelp Camp/tnzljfuzyfjwb7weyipa'
        },
        {
          url: 'https://res.cloudinary.com/dt1mvgryx/image/upload/v1623957910/Yelp%20Camp/efx00h14xm9qntek5zyw.jpg',
          filename: 'Yelp Camp/efx00h14xm9qntek5zyw'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
