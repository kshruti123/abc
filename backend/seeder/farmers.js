const bcrypt = require("bcryptjs");
const farmers = [
    {
        firstname: "Aditya",
        lastname: "Kondapalli",
        password:bcrypt.hashSync('9470334066',10),
        age: 46,
        phoneNumber: "9470334066",
        gender: "Male",
        address: "flat 456, Sapphire Apartments",
        area: "Manikonda",
        pincode: "512067",
        rating: 5,
        reviewsNumber: 3,
        reviews: [],
      },
      {
        firstname: "Raghavendra",
        lastname: "Pasupuleti",
        password:bcrypt.hashSync('7395845672',10),
        age: 46,
        phoneNumber: "7395845672",
        gender: "Male",
        address: "House number:789, Emerald Avenue,",
        area: "Ameerpet",
        pincode: "577169",
        rating: 2,
        reviewsNumber: 1,
        reviews: [],
      },
      {
        firstname: "Srinivas",
        lastname: "Chalasani",
        password:bcrypt.hashSync('8374919876',10),
        age: 41,
        phoneNumber: "8374919876",
        gender: "Male",
        address: "plot no:321, Diamond Road,",
        area: "Gachibowli",
        pincode: "568413",
        rating: 4,
        reviewsNumber: 2,
        reviews: [],
      },
      {
        firstname: "Venkateshwari",
        lastname: "Madireddy",
        password:bcrypt.hashSync('8470136349',10),
        age: 26,
        phoneNumber: "8470136349",
        gender: "Female",
        address: "flat no:101,Icons comforts",
        area: "Ameerpet",
        pincode: "596011",
        rating: 2,
        reviewsNumber: 4,
        reviews: [],
      },
      {
        firstname: "Praveen",
        lastname: "Duggirala",
        password:bcrypt.hashSync('9722391031',10),
        age: 26,
        phoneNumber: "9722391031",
        gender: "Male",
        address: "House num:789, Rosewood Apartments",
        area: "Miyapur",
        pincode: "522842",
        rating: 5,
        reviewsNumber: 5,
        reviews: [],
      },
      {
        firstname: "Rajendra",
        lastname: "Vemulapalli",
        password:bcrypt.hashSync('7639139525',10),
        age: 25,
        phoneNumber: "7639139525",
        gender: "Male",
        address: "My cow farm,beside Saffron Hotel",
        area: "Gachibowli",
        pincode: "506360",
        rating: 4,
        reviewsNumber: 0,
        reviews: [],
      },
      {
        firstname: "Mahesh",
        lastname: "Nalluri",
        password:bcrypt.hashSync('6084809292',10),
        age: 55,
        phoneNumber: "6084809292",
        gender: "Male",
        address: "2nd Floor,above hdfc bank,street number 2",
        area: "Lakdikapul",
        pincode: "522999",
        rating: 3,
        reviewsNumber: 6,
        reviews: [],
      },
      {
        firstname: "Naveena",
        lastname: "Gaddam",
        password:bcrypt.hashSync('9923974358',10),
        age: 30,
        phoneNumber: "9923974358",
        gender: "Female",
        address: "house no:45,Ambedkar colony",
        area: "Chikkadpally",
        pincode: "582518",
        rating: 2,
        reviewsNumber: 4,
        reviews: [],
      },
      {
        firstname: "Harishtha",
        lastname: "Varikuti",
        password:bcrypt.hashSync('9923974458',10),
        age: 24,
        phoneNumber: "9923974458",
        gender: "Female",
        address: " Sai Organic milk,monda market",
        area: "Secunderabad",
        pincode: "566320",
        rating: 1,
        reviewsNumber: 5,
        reviews: [],
      },
      {
        firstname: "Satish",
        lastname: "Parvathaneni",
        password:bcrypt.hashSync('9633656971',10),
        age: 52,
        phoneNumber: "9633656971",
        gender: "Male",
        address: "flat no:507,Keerthana apartments",
        area: "Miyapur",
        pincode: "507372",
        rating: 4,
        reviewsNumber: 1,
        reviews: [],
      },
    
];
module.exports = farmers;
