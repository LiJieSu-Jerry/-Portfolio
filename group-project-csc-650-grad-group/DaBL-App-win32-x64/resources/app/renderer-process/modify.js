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


/* --------------- local variables --------------- */

/*
// Tell main process to show the menu when demo button is clicked
const email_verify = document.getElementById('email-verify')
const name = document.getElementById('name-modify')
const email = document.getElementById('email-modify')
const auid = document.getElementById('auid-modify')
const agreement = document.getElementById('agreement-modify')
const printer = document.getElementById('printer-modify')
const lasercutter = document.getElementById('lasercutter-modify')
const boxcutter = document.getElementById('boxcutter-modify')
*/


// submit button
const submit = document.getElementById('submit-modify')


/* --------------- SUBMIT button event function --------------- */
submit.addEventListener('click', () => {

  // Tell main process to show the menu when demo button is clicked
  const name = document.getElementById('name-modify')
  const auid = document.getElementById('auid-modify')
  const auid_prev = document.getElementById('auid-modify')
  const membertype = document.getElementById('membertype-modify')
  const email = document.getElementById('email-modify')
  const membersince = "ignore_this_value"; //moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); //moment(date).format('YYYY-MM-DD HH:mm:ss'); //.toISOString()
  const lastaccess = membersince;
  const agreement = document.getElementById('agreement-modify')
  const series1pro = document.getElementById('series1pro-modify')
  const thr3dprinter = document.getElementById('thr3dprinter-modify')
  const jaguarvlx = document.getElementById('jaguarvlx-modify')
  const bantamtools = document.getElementById('bantamtools-modify')
  const pls475 = document.getElementById('pls475-modify')
  const sewing = document.getElementById('sewing-modify')
  const test = "ignore_this_value";
  const email_verify = document.getElementById('email-verify')
  // FOR // DEBUG: ERASE!


  console.log("name=", name.value)
  // var to check for null value
  var email_verify_Empty = checkString(email_verify.value);
  console.log("email_verify (type of): ", typeof email_verify_Empty);
  // error/clear error messages
  var err_eml_msg = "ERROR: Must enter EMAIL ADDRESS for verification."
  var clear_msg = ""

  /*
     Checks to see if the AUID and EMAIL exists
     if true -> populate database, else return error
     Ultimately, this means that the most important entry is the AUID
   */
  if (typeof email_verify_Empty === 'undefined') {
    // Verification Email Check
    document.getElementById('error-reply-modify').innerHTML = err_eml_msg;
  /*} else if (typeof emailEmpty === 'undefined') {
    // EMAIL ADDRESS Check
      document.getElementById('error-reply').innerHTML = err_eml_msg;*/
  } else {

    var mod_array = []
    // clear the error message
    document.getElementById('error-reply-modify').innerHTML = clear_msg

    // Create modify array

    var empty = "ignore_this_value"

    // name
    if (!name.value == '') {
      mod_array.push(name.value);
    } else {
      mod_array.push(empty);
    }
    // uid
    if (!auid.value == '') {
      mod_array.push(auid.value);
    } else {
      mod_array.push(empty);
    }
    // uid-prev
    if (!auid_prev.value == '') {
      mod_array.push(auid_prev.value);
    } else {
      mod_array.push(empty);
    }
    // membertype
    if (!membertype.value == '') {
      mod_array.push(membertype.value);
    } else {
      mod_array.push(empty);
    }
    // email
    if (!email.value == '') {
      mod_array.push(email.value);
    } else {
      mod_array.push(empty);
    }
    // membersince
    mod_array.push(empty);
    //lastaccess
    mod_array.push(empty);
    // waiver
    if (agreement.checked == true ) {
      mod_array.push(agreement.checked);
    } else {
      mod_array.push(empty);
    }
    //series1pro
    if (series1pro.checked == true ) {
      mod_array.push(series1pro.checked);
    } else {
      mod_array.push(empty);
    }
    //thr3dprinter
    if (thr3dprinter.checked == true ) {
      mod_array.push(thr3dprinter.checked);
    } else {
      mod_array.push(empty);
    }
    // jaguarvlx
    if (jaguarvlx.checked == true ) {
      mod_array.push(jaguarvlx.checked);
    } else {
      mod_array.push(empty);
    }
    // bantamtools
    if (bantamtools.checked == true ) {
      mod_array.push(bantamtools.checked);
    } else {
      mod_array.push(empty);
    }
    // pls475
    if (pls475.checked == true ) {
      mod_array.push(pls475.checked);
    } else {
      mod_array.push(empty);
    }
    // sewing
    if (sewing.checked == true ) {
      mod_array.push(sewing.checked);
    } else {
      mod_array.push(empty);
    }
    //test
    mod_array.push(empty);
    // last item = email verification
    mod_array.push(email_verify.value);

    mod_array.forEach(function(item) {
      console.log(item)
    })
    // MYSQL push
    ipcRenderer.send('mysql_modify', mod_array);
    //ipcRenderer.send('mysql_modify', email_verify.value, name.value, email.value, auid.value, agreement.checked, printer.checked, lasercutter.checked, boxcutter.checked);
    //result = mainProcess.get_mysql_output //mysql_push(name.value, email.value, auid.value, agreement.checked, printer.checked, lasercutter.checked, boxcutter.checked);
    ipcRenderer.on('mysql_modify_resperr', (event, content) => {
      console.log("db response = ", content);
      // clear the error message
      document.getElementById('error-reply-modify').innerHTML = content;
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

/* --------- MYSQL DATABASE PUSH -----------
function mysql_push(nm, eml, id, agrmnt, print, laser, box) {
  /* ------------------------ MYSQL - localhost --------------

  // HARD-CODED
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'dabl_aws' //your database name here
  });

  // Connect to the data base
  connection.connect();

  // perform AUID exists check
  var key = id;
  var q_string = 'SELECT * FROM user_local WHERE auid = ?';

  connection.query(q_string, [key], function(err, result) {
    if (err) throw err;
    return result
    //console.log(result);
  });

  connection.end();
*/

//function comms() {
  //ipcRenderer.send('send-mysql_data', name.value, email.value, auid.value, agreement.checked, printer.checked, lasercutter.checked, boxcutter.checked )


//connection.query()
