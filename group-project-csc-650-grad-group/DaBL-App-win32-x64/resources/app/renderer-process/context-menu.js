/* *********************************************** /
/                                                  /
/              MENU RENDERER PROCESS               /
/                                                  /
/ *********************************************** */


/* --------------- REQUIREMENTS --------------- */
const {remote, ipcRenderer} = require('electron')
//const mysql = require('mysql');
// by using remote, you can call the mysql function here on
// behalf of the main process
//const { remote } = require('electron');
const mainProcess = remote.require('./main.js');
var moment = require('moment');


// submit button
const submit = document.getElementById('submit-createnew')


/* --------------- SUBMIT button event function --------------- */
submit.addEventListener('click', () => {
  /* --------------- local variables --------------- */

  // Tell main process to show the menu when demo button is clicked
  const name = document.getElementById('name-createnew')
  const auid = document.getElementById('auid-createnew')
  const auid_prev = document.getElementById('auid-createnew')
  const membertype = document.getElementById('membertype-createnew')
  const email = document.getElementById('email-createnew')
  const membersince = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); //moment(date).format('YYYY-MM-DD HH:mm:ss'); //.toISOString()
  const lastaccess = membersince
  const agreement = document.getElementById('agreement-createnew')
  const series1pro = document.getElementById('series1pro-createnew')
  const thr3dprinter = document.getElementById('thr3dprinter-createnew')
  const jaguarvlx = document.getElementById('jaguarvlx-createnew')
  const bantamtools = document.getElementById('bantamtools-createnew')
  const pls475 = document.getElementById('pls475-createnew')
  const sewing = document.getElementById('sewing-createnew')
  const test = 'null'

  // ADD TO ARRAY:
  // name / UID / UIDprev / membertype / email / membersince / lastaccess / waiver /
  // series1pro / thr3dprinter / jaguarvlx / bantamtools / pls475 / sewing / test
  var new_user_array = []

  // add values to the new_user_array
  new_user_array.push(name.value, auid.value, auid_prev.value, membertype.value, email.value,
    membersince, lastaccess, agreement.checked, series1pro.checked,
    thr3dprinter.checked, jaguarvlx.checked, bantamtools.checked, pls475.checked,
    sewing.checked, test.value);

  // for debugging purpose - check the GUI concole (ctrl-shift+i)
  new_user_array.forEach(function(value){
      console.log(value);
    });

  // var to check for null value
  var idEmpty = checkString(auid.value);
  var emailEmpty = checkString(email.value);
  // error/clear error messages
  var err_id_msg = "ERROR: Must enter AUID NUMBER"
  var err_eml_msg = "ERROR: Must enter EMAIL ADDRESS"
  var clear_msg = ""

  /*
     Checks to see if the AUID and EMAIL exists
     if true -> populate database, else return error
     Ultimately, this means that the most important entry is the AUID
   */
  if (typeof idEmpty === 'undefined') {
    // AUID Check
    document.getElementById('error-reply').innerHTML = err_id_msg;
  } else if (typeof emailEmpty === 'undefined') {
    // EMAIL ADDRESS Check
      document.getElementById('error-reply').innerHTML = err_eml_msg;
  } else {

    // clear the error message
    document.getElementById('error-reply').innerHTML = clear_msg


    // MYSQL push
    //ipcRenderer.send('mysql_data', name.value, email.value, auid.value, agreement.checked, printer.checked, lasercutter.checked, boxcutter.checked);
    ipcRenderer.send('mysql_data', new_user_array);
    //result = mainProcess.get_mysql_output //mysql_push(name.value, email.value, auid.value, agreement.checked, printer.checked, lasercutter.checked, boxcutter.checked);
    ipcRenderer.on('mysql_data_resperr', (event, content) => {
      console.log("db response = ", content);
      // clear the error message
      document.getElementById('error-reply').innerHTML = content;
      });
    // clear all
  }
})


/* --------- checks for null strings ----------- */
function checkString(x) {
  if (x) {
    return true
  }
}
