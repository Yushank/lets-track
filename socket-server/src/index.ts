import { Request, Response } from "express";
import type { Socket } from "socket.io"

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", //allow all for now
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "https://lets-track.vercel.app/",
    methods: ["GET", "POST"]
}));
app.use(express.json());

//socket connection
io.on('connection', (socket: Socket) => {
    console.log("user connected", socket.id);

    socket.on('disconnect', () => {
        console.log("user disconnected:", socket.id);
    });

    // Error handling
    socket.on("error", (err) => {
        console.error("Socket error:", err);
    });
});


//HTTP route to emit
app.post('/emit-meal', (req: Request, res: Response) => {
    console.time("emit-process");
    res.send("✅ Railway socket server is live!");
    const meal = req.body;

    if (!meal) {
        return res.status(400).json({ error: "No meal data provided" });
    }

    console.log("Emitting meal:", meal);
    io.emit('newMeal', meal);

    res.json({ status: 'Meal emitted' })
    console.timeEnd("emit-process");
});


//start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket server is running on ${PORT}`);
});