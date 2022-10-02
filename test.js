const { v4: uuidv4 } = require("uuid");
const url = "https://7dndfz6dlc.execute-api.ap-southeast-1.amazonaws.com/items";
const id = uuidv4();
fetch(url, {
  method: "PUT",
  headers: {
    "Content-type": "application/json; charset=UTF-8", // Indicates the content
  },
  body: JSON.stringify({
    id,
    price: 40,
    time: "0930_01-10-22",
  }),
}) //api for the get request
  .then((response) => response.json())
  .then((data) => console.log(data));
