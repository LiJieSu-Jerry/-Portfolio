
/*
require('update-electron-app')({
  logger: require('electron-log')
})
*/
const path = require('path')
const glob = require('glob')
const mysql = require('mysql');
//var Promise = require('promise');
var async = require('async');
const {app, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain;


const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')

let mainWindow = null

function initialize () {
  makeSingleInstance()

  //loadDemos()

  function createWindow () {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      frame: false,
      transparent: true,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}


initialize()


// ---------------------- THIS ENDS THE ELECTRON PORTION ------------------------------------------------------------->>>>>
// *_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*



/* --------- MYSQL DATABASE FUNCTIONALITY ---------------------------------------------- */


// IMPORTANT: If you encounter the error:
// Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
/* GO TO:
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/56509065#56509065
*/
// ---- Accessing the RowDataPacket object:
/*
      [ RowDataPacket {
        '@update_id': 'WAbWA1WA5WA2WA8WAdWA4WA9' } ] ]
      USE:
         results[0].@update_id
*/


//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*

// ---------------- SUBMITTING A NEW USER ------------------------------------//

//ipc.on('mysql_data', (event, nm, eml, id, agrmnt, print, laser, box) => {
ipc.on('mysql_data', (event, new_user) => {

  var name = new_user[0]
  var auid = new_user[1]
  var auid_prev = new_user[2]
  var membertype = new_user[3]
  var email = new_user[4]
  var membersince = new_user[5]
  var lastaccess = new_user[6]
  var agreement = new_user[7]
  var series1pro = new_user[8]
  var thr3dprinter = new_user[9]
  var jaguarvlx = new_user[10]
  var bantamtools = new_user[11]
  var pls475 = new_user[12]
  var sewing = new_user[13]
  var test = new_user[14]

  var new_user_aws = []

  new_user_aws.push(email, agreement, series1pro,
  thr3dprinter, jaguarvlx, bantamtools, pls475,
  sewing)
//function mysql_push (nm, eml, id, agrmnt, print, laser, box) {
//exports.mysql_push = (nm, eml, id, agrmnt, print, laser, box) => {
  /* ------------------------ MYSQL - localhost -------------- */

  // Connect to the data base
  var connection  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'dabl_aws' //your database name here
});

// Connect to the data base
/*
var connection_aws  = mysql.createPool({
  host     : 'http://ec2-3-94-115-49.compute-1.amazonaws.com/',
  user     : 'root',
  password : '',
  database : '' //your database name here
});
*/

  // perform AUID exists check
  var key = auid;
  var nt_fnd = "User Not Found"
  var q_string = 'SELECT * FROM local_db WHERE uid = ?';

  connection.query(q_string, [key], function(err, result) {

    if (err) {//throw err;
      throw err;
      connection.end();
    } else if (result.length > 0){
      console.log(result);
      var content = "AUID #" + result[0].auid + " already exists in database."
      console.log(content);
      event.reply('mysql_data_resperr', content);
      //console.log(nm, eml, id, agrmnt, print, laser, box);
      //console.log("Connected to local database");
    } else {
      var success = "Successful entry into the database."
      console.log(nt_fnd);
      //mysql_submit_new_user(connection, nm, eml, id, agrmnt, print, laser, box)

      // LOCAL push
      async.parallel([
        function(parallel_done) {
          var q_string = 'INSERT INTO local_db (name, UID, UIDprev, membertype, email, membersince, lastaccess, waiver, series1pro, thr3dprinter, jaguarvlx, bantamtools, pls475, sewing, test) VALUES (?)';
          connection.query(q_string, [new_user], function(err, result)  {
            if (err) {//throw err;
              throw err;
            } else {
              console.log("1 record inserted into LOCAL");
            }
          });
        },
        // AWS push
        function(parallel_done) {
          var q_string = 'INSERT INTO aws_aws (email, waiver, series1pro, thr3dprinter, jaguarvlx, bantamtools, pls475, sewing) VALUES (?)';
          connection.query(q_string, [new_user_aws], function(err, result)  {
            if (err) {//throw err;
              throw err;
            } else {
              console.log("1 record inserted into AWS");
            }
          });
        }
       ], function(err) {
            if (err) console.log(err);
            pool.end();
            res.send(return_data);
       });

      //console.log("resp_db: ", x)

      event.reply('mysql_data_resperr', success);

    }


  });

});

// FUNCTION to insertNEW USER into database
// CURRENTLY NOT BEING USED in order to work with the async.parallel function => COULD DEFINTELY BE MORE ELEGANT!!!
//
//function mysql_submit_new_user (_conn, _nm, _eml, _id, _agrmnt, _print, _laser, _box) {
function mysql_submit_new_user_local (_conn, _key) {
                                    // timestamp               // timestamp
  //var key = [_nm, _id, 0, 0, _eml, '2019-02-04 16:48:58' , '2019-02-04 16:48:58', _agrmnt, 0, _print, 0, _box, _laser,0, 0];
  //var q_string = 'INSERT INTO user_local (name, email, auid, agreement, printer, lasercutter, boxcutter) VALUES (?)';
// 15x columns: name / UID / UIDprev / membertype / email / membersince / lastaccess / waiver / series1pro / thr3dprinter / jaguarvlx / bantamtools / pls475 / sewing / test

  var q_string = 'INSERT INTO local_db (name, UID, UIDprev, membertype, email, membersince, lastaccess, waiver, series1pro, thr3dprinter, jaguarvlx, bantamtools, pls475, sewing, test) VALUES (?)';
  _conn.query(q_string, [_key], function(err, result)  {
    if (err) {//throw err;
      throw err;
    } else {
      console.log("1 record inserted");
      return('true');
    }

    });
}


function mysql_submit_new_user_aws (_conn, _key) {
                                    // timestamp               // timestamp
  //var key = [_nm, _id, 0, 0, _eml, '2019-02-04 16:48:58' , '2019-02-04 16:48:58', _agrmnt, 0, _print, 0, _box, _laser,0, 0];
  //var q_string = 'INSERT INTO user_local (name, email, auid, agreement, printer, lasercutter, boxcutter) VALUES (?)';
// 15x columns: name / UID / UIDprev / membertype / email / membersince / lastaccess / waiver / series1pro / thr3dprinter / jaguarvlx / bantamtools / pls475 / sewing / test

  var q_string = 'INSERT INTO aws_aws (email, agreement, series1pro, thr3dprinter, jaguarvlx, bantamtools, pls475, sewing) VALUES (?)';

  _conn.query(q_string, [_key], function(err, result) {
    if (err) {//throw err;
      throw err;
    } else {
      console.log("1 record inserted");
    }
  });
}


// ---------------------- THIS ENDS THE NEW USER PORTION ------------------------------------------------------------->>>>>
// *_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*
//*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*_-_*


// ---------------- MODIFYING A USER ------------------------------------//

ipc.on('mysql_modify', (event, modified) => {
//function mysql_push (nm, eml, id, agrmnt, print, laser, box) {
//exports.mysql_push = (nm, eml, id, agrmnt, print, laser, box) => {
  /* ------------------------ MYSQL - localhost -------------- */

  // Connect to the data base
  var connection  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'dabl_aws' //your database name here
});

  /* DELETE
  modified.forEach(function(item) {
    console.log(item)
  })
  */
console.log(modified)

// email_verify.value, name.value, email.value, auid.value, agreement.checked, printer.checked, lasercutter.checked, boxcutter.checked);
var name = modified[0]
var auid = modified[1]
var auid_prev = modified[2]
var membertype = modified[3]
var email = modified[4]
var membersince = modified[5]
var lastaccess = modified[6]
var agreement = modified[7]
var series1pro = modified[8]
var thr3dprinter = modified[9]
var jaguarvlx = modified[10]
var bantamtools = modified[11]
var pls475 = modified[12]
var sewing = modified[13]
var test = modified[14]
var em_v = modified[15]

var modified_aws = []

modified_aws.push(email, agreement, series1pro,
thr3dprinter, jaguarvlx, bantamtools, pls475,
sewing, test)
/*
  em_v = modified[0]
  nm = modified[1]
  eml = modified[2]
  id = modified[3]
  agrmnt = modified[4]
  print = modified[5]
  laser = modified[6]
  box = modified[7]
*/
  // perform AUID exists check
  var key = em_v;
  var nt_fnd = "User Not Found"
  var q_string = 'SELECT * FROM local_db WHERE email = ?';

  connection.query(q_string, [key], function(err, result) {
    if (err) {//throw err;
      throw err;
      connection.release();
    } else if (result.length > 0){
      var content = "Email:" + result[0].email + " exists in database."
      console.log(content);
      mysql_modify_user(connection, modified); //em_v, nm, eml, id, agrmnt, print, laser, box)
      var _success = "Modified Complete";
      event.reply('mysql_modify_resperr', _success);
      //console.log(nm, eml, id, agrmnt, print, laser, box);
      //console.log("Connected to local database");
    } else {
      console.log(nt_fnd);
      event.reply('mysql_modify_resperr', nt_fnd);
    }
  });
});

// FUNCTION to insertNEW USER into database
function mysql_modify_user (_conn, mod) { //_em_v, _nm, _eml, _id, _agrmnt, _print, _laser, _box) {
  var ignore = "ignore_this_value"
  //var key = [_nm, _eml, _id, _agrmnt, _print, _laser, _box];
  //var q_string = 'INSERT INTO user_local (name, email, auid, agreement, printer, lasercutter, boxcutter) VALUES (?)';
  //var q_string = 'UPDATE local_db SET '//'INSERT INTO user_local (';
  //var where = 'WHERE';

  // UPDATE user_local SET name = '_nm' WHERE email = '_em_v'
  // UPDATE local_db SET col_var = x WHERE (col_var = y);

  var name = mod[0]
  var auid = mod[1]
  var auid_prev = mod[2]
  var membertype = mod[3]
  var email = mod[4]
  var membersince = mod[5]
  var lastaccess = mod[6]
  var agreement = mod[7]
  var series1pro = mod[8]
  var thr3dprinter = mod[9]
  var jaguarvlx = mod[10]
  var bantamtools = mod[11]
  var pls475 = mod[12]
  var sewing = mod[13]
  var test = mod[14]
  var em_v = mod[15]

  _q_string = 'UPDATE local_db SET ? WHERE (email = ?)';

  // * Resource: https://stackoverflow.com/questions/14992879/node-js-mysql-query-syntax-issues-update-where/19358694
  // * Resoure (BEST): https://stackoverflow.com/questions/29631131/perform-two-or-more-queries-in-one-request-using-node-mysql-and-expressjs
  async.parallel([
       function(parallel_done) {
          // name
          if (name === ignore) {
            console.log("ignoring name...")
          } else {
            _conn.query(_q_string, [{name: name}, em_v], function(err, result) {
              if (err) {//throw err;
                return parallel_done(err);
                //throw err;
              } else {
                console.log("1 record inserted");
                parallel_done();
              }
            });
          }
        },
        function(parallel_done) {
          // email
          if (email === ignore) {
            console.log("ignoring email...")
          } else {
            _conn.query(_q_string, [{email: email}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // AUID
          if (auid === ignore) {
            console.log("ignoring AUID...")
          } else {
            _conn.query(_q_string, [{uid: auid}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // membertype
          if (membertype === ignore) {
            console.log("ignoring membertype...")
          } else {
            _conn.query(_q_string, [{membertype: membertype}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // membertype
          if (membertype === ignore) {
            console.log("ignoring membertype...")
          } else {
            _conn.query(_q_string, [{membertype: membertype}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          if (lastaccess === ignore) {
            console.log("ignoring lastaccess...")
          } else {
            _conn.query(_q_string, [{lastaccess: lastaccess}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // waiver
          if (agreement === ignore) {
            console.log("ignoring agreement...")
          } else {
            _conn.query(_q_string, [{waiver: agreement}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // thr3dprinter
          if (thr3dprinter === ignore) {
            console.log("ignoring thr3dprinter...")
          } else {
            _conn.query(_q_string, [{thr3dprinter: thr3dprinter}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // jaguarvlx
          if (jaguarvlx === ignore) {
            console.log("ignoring jaguarvlx...")
          } else {
            _conn.query(_q_string, [{jaguarvlx: jaguarvlx}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // bantamtools
          if (bantamtools === ignore) {
            console.log("ignoring bantamtools...")
          } else {
            _conn.query(_q_string, [{jaguarvlx: jaguarvlx}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // pls475
          if (pls475 === ignore) {
            console.log("ignoring pls475...")
          } else {
            _conn.query(_q_string, [{pls475: pls475}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
        function(parallel_done) {
          // sewing
          if (sewing === ignore) {
            console.log("ignoring sewing...")
          } else {
            _conn.query(_q_string, [{sewing: sewing}, em_v], function(err, result) {
              if (err) {//throw err;
                throw err;
              } else {
                console.log("1 record inserted");
              }
            });
          }
        },
      ], function(err) {
                 if (err) console.log(err);
                 pool.end();
                 res.send(return_data);
            });

}

function conduct_query(_connection, _query_string, _qs) {
  _connection.query(_query_string, [_qs], function(err, result) {
    if (err) {//throw err;
      throw err;
    } else {
      console.log("1 record inserted");
    }
  });
}


// ---------------- Read in config file ------------------------------------//
/*
const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('/path/to/file'),
    output: process.stdout,
    console: false
});
readInterface.on('line', function(line) {
    console.log(line);
});

function readConfig(){

}
*/
