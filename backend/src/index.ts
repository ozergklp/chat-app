import { Server, Socket } from 'socket.io';
import http from 'http';
import express, {Express, NextFunction, Request, Response} from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next()
})




const server = app.listen(process.env.PORT, () => {
    console.log(`listening port ${process.env.PORT}`)
})


const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});
io.on("connection", (socket: Socket) => {
    console.log(`${socket.id} connected`);
    
        socket.on("send-msg", (msg: string, room: string, name:string) => {
            console.log(`Received message from ${socket.id}: ${msg}`);
            if(room === '') socket.broadcast.emit("receive-msg", `from ${name}: ${msg}`);
            else socket.to(room).emit("receive-msg", `${name}: ${msg}`);
        });

        socket.on("join-room",( room: string)=> {
            socket.join(room)
            //cb(`Joined ${room}`)
        })
    
        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
        });
});
