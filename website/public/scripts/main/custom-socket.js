const socket = io.connect("https://toxmod.xyz");

socket.on('userCount', userCount => {
        document.getElementById('connectionCount').innerHTML = userCount;
  })