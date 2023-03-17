const http=require('http');
const express=require('express');
// const serverless=require('serverless-http');
const socketio=require('socket.io');
const { count } = require('console');
const app=express();
const server=http.createServer(app);
const io=socketio(server);
app.use('/',express.static(_dirname='public'));
user={
    'nitya':1234,
}
let socketmap={}
io.on('connection',(socket)=>{
    function login(s,u){
        s.join(u);
        s.emit('loggedin');
        socketmap[socket.id]=u;
    }
   socket.on('login',(data)=>{
    if(user[data.username]){
        if(user[data.username]==data.password){
           login(socket,data.username)
        }else{
            socket.emit('login_failed')
        }
    }else{
        user[data.username]=data.password;
        login(socket,data.username)
    }
    console.log(user);
   })

   socket.on('send',(data)=>{
    data.from=socketmap[socket.id]
    if(data.to){
        io.to(data.to).emit('msg_rcvd',data);
    }else{

        socket.broadcast.emit('msg_rcvd',data);
    }
   })

})
// const router=express.Router();


// app.use('/.netlify/functions/server',router);

// module.exports.handler=serverless(app);
server.listen(3344,()=>{
    console.log("stated on http://localhost:3344");
})