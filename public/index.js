let socket =io();

$('#loginbox').show();
$('#chatbox').hide();

$('#btnlogin').click(()=>{
    socket.emit('login',{
        username:$('#username').val(),
        password:$('#inpass').val()
    })
})
socket.on('loggedin',()=>{
    $('#loginbox').hide();
    $('#chatbox').show();
})
socket.on('login_failed',()=>{
    window.alert('Password or username incorrect');
})

$('#send').click(()=>{
    socket.emit('send',{
        to:$("#touser").val(),
        msg:$('#msg').val()
    })
})
socket.on('msg_rcvd',(data)=>{
    $('#ullist').append($('<li>').text(
        `[${data.from}]:${data.msg}`
    ));
})