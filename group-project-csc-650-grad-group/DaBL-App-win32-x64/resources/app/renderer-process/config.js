const {ipcRenderer} = require('electron')

//const asyncMsgBtn = document.getElementById('async-msg')
// Tell main process to show the menu when demo button is clicked
const localdb_file = document.getElementById('customFile_1')
const remotedb_file = document.getElementById('customFile_2')
// submit button
const submit_local = document.getElementById('submit-localdb')
const submit_remote = document.getElementById('submit-remotedb')


submit_local.addEventListener("click", () => {
    console.log("localdb_file:", localdb_file);
  });


submit_local.addEventListener('click', () => {
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(localdb_file)
  });
  lineReader.on('line', function (line) {
    console.log('Line from file:', line);
  });
})

/*
asyncMsgBtn.addEventListener('click', () => {
  ipcRenderer.send('asynchronous-message', 'ping')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('async-reply').innerHTML = message
})
*/
