const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

// This will store the connected users and their socket IDs
let users = []; // Array to store users and their socket IDs

// When a user connects
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register a user with their userId (this is the ID for messaging)
  socket.on("register_user", (userId) => {
    if (!userId) {
      console.log("User registration failed: No user ID provided");
      return;
    }
    
    // Check if the user is already registered
    const existingUser = users.find(user => user.userId === userId);
    if (existingUser) {
      console.log(`User ${userId} already registered.`);
    } else {
      users.push({ userId, socketId: socket.id });
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
    }
  });

  // Listen for incoming messages and route them to the specific user
  socket.on("send_message", (message) => {
    console.log("Message received:", message);

    if (!message || !message.recipientId || !message.text) {
      console.log("Invalid message format.");
      return;
    }

    // Find recipient by userId
    const recipient = users.find(user => user.userId === message.recipientId);

    if (recipient) {
      // Send the message to the recipient's socket
      io.to(recipient.socketId).emit("receive_message", {
        text: message.text,
        sender: message.sender || "me", // 'me' is default, you can customize it
      });
      console.log(`Message sent to ${message.recipientId}`);
    } else {
      console.log(`Recipient with ID ${message.recipientId} not found.`);
    }
  });

  // Handle disconnections and clean up the users array
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    users = users.filter(user => user.socketId !== socket.id);
  });
});

// Basic route to check server status 
// me chahti ki jb me apni id se login hu jo bhi userlist me hai unme se kisiko bhi msg kru to vo msg uske me ja jab me user ko login kru to dheikhe kikisi user ne use messga ekiya phir vo usko reply kre ye kaise kru pls code
app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

// Start the server on port 4000
server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
