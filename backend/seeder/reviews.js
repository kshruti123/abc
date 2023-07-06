const { ObjectId } = require("mongodb");
const reviews = [
  {
    comment:
      "ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat",
    rating: 4,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment:
      "convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi",
    rating: 4,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment:
      "vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero",
    rating: 4,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment:
      "curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac",
    rating: 5,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment:
      "augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere",
    rating: 1,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment: "turpis enim blandit mi in porttitor pede justo eu massa",
    rating: 4,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment:
      "odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque",
    rating: 4,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment: "ullamcorper purus sit amet nulla quisque arcu libero rutrum ac",
    rating: 2,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment: "in faucibus orci luctus et ultrices posuere cubilia curae mauris",
    rating: 0,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
  {
    comment:
      "interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus",
    rating: 2,
    user:{_id: new ObjectId(),firstname:"Aditya",lastname:"Kondapalli"}
  },
];
module.exports = reviews;
