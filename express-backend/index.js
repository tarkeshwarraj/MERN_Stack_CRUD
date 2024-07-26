const express = require("express"); //Express js Framework ko file mein la raha hain

const app = express();

const cors = require("cors");

const users = require("./MOCK_DATA.json"); //Is File ko Data base samjho. CREATE, READ, UPDATE, DELETE is file mein karenge

const fs = require("fs"); //Ya jo Module ya (Simple word :- chota sa fs software) File ko read write delete karna ka power deta hai.Ya use kar raha hai bcs Database ka naam par ham MOCK_DATA.json file ka use kar raha hai

const PORT = 8000; //Is Port par Hamara Server Start hoga

//Middleware - Plugin
app.use(cors()); //This line to enable CORS
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

////////////////////////////////////////////////////////
//Routes  Server Side render Page. Is Type sa Ham Direct Server par File Generator karta hai aur client to Full page deta hai,HTML,css, React and all that
app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li> ${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Route ya API For Mobile. Is type sa Ham API bante hai is par ham JSON format mein frontend to data send karta hai.Mobile App mein is thara ka API use hota hai jo JSON mein data late hai Backend sa.
app.get("/api/users", (req, res) => {
  return res.json(users); //return response with users data in json format(line no 2);
});

//This is For Single Id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});
////////////////////////////////////////////////////////
//This is for POST Request Data. To Insert a new user or Data in Database
app.post("/api/users", (req, res) => {
  //When this call the Arrow function will called (line no 38)
  const body = req.body; //This line extracts the request body (which contains the new user data sent by the client) and assigns it to the variable body.
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "success",
      id: users.length,
    });
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  //Update the user's data with the data from the request body
  const updateUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updateUser;

  //Save the updated users list to the JSON file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to Update user" });
    }
    return res.json({
      status: "success",
      user: updateUser,
    });
  });
});

//To Delete the user from The Database we using this Route/API. In Easy words below function
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  users.splice(userIndex, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete user" });
    }

    return res.json({
      status: "User deleted successfully",
    });
  });
});

app.listen(PORT, () => console.log("Server Started at Port number 8000")); //Server is listening
