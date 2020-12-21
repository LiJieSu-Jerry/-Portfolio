/*
Copyright (C) <2019> <Design & Build  Lab (DaBL) of American Univeristy>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restricti$

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON$
*/

<?php
require __DIR__.'/vendor/autoload.php'; //load library directly from working folder
class Event{
  private $client;
  private $event;
  private $service;
  private $calendarId;
  function __construct(){
    $this->client=self::getClient();
    $this->service = new Google_Service_Calendar($this->client);
  }
  function getClient()
  {
      $client = new Google_Client();
      $client->setApplicationName('DABL Reservation');
      $client->setScopes(Google_Service_Calendar::CALENDAR);
      $client->setAuthConfig('credentials.json');
      $client->setAccessType('offline');
      $client->setPrompt('select_account consent');
      // Load previously authorized token from a file, if it exists.
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      $tokenPath = 'token.json';
      if (file_exists($tokenPath)) {
          $accessToken = json_decode(file_get_contents($tokenPath), true);
          $client->setAccessToken($accessToken);
      }

      // If there is no previous token or it's expired.
      if ($client->isAccessTokenExpired()) {
          // Refresh the token if possible, else fetch a new one.
          if ($client->getRefreshToken()) {
              $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
          } else {
              // Request authorization from the user.
              $authUrl = $client->createAuthUrl();
              printf("Open the following link in your browser:\n%s\n", $authUrl);
              print 'Enter verification code: ';
              $authCode = trim(fgets(STDIN));

              // Exchange authorization code for an access token.
              $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
              $client->setAccessToken($accessToken);

              // Check to see if there was an error.
              if (array_key_exists('error', $accessToken)) {
                  throw new Exception(join(', ', $accessToken));
              }
          }
          // Save the token to a file.
          if (!file_exists(dirname($tokenPath))) {
              mkdir(dirname($tokenPath), 0700, true);
          }
          file_put_contents($tokenPath, json_encode($client->getAccessToken()));
      }
      return $client;
  }

  //----------event

  function eventForm($attendeeEmail,$startDateTime,$endDateTime,$machineName){
      $this->getCalendarId($machineName);
      $this->event = new Google_Service_Calendar_Event(array(
        'summary' => 'DABL machine reserved',
        'location' => 'Don Myers Technology and Innovation Building Room 101',
        'description' => 'You reserved a machine in DABL',
        'start' => array(
          'dateTime' => $startDateTime,
          'timeZone' =>'America/New_York',
        ),
        'end' => array(
          'dateTime' => $endDateTime,
          'timeZone' => 'America/New_York',
        ),
        'attendees' => array(
          array('email' => $attendeeEmail),
        ),
        'reminders' => array(
          'useDefault' => FALSE,
          'overrides' => array(
            array('method' => 'email', 'minutes' => 24 * 60),
            array('method' => 'popup', 'minutes' => 10),
          ),
        ),
      ));
  }
//add new machine calendar in this section
  function getCalendarId($machineName){
    switch($machineName){
      case 'White 3D Printer':
        $this->calendarId='dt7fkbof6kam1phljd6akum3oo@group.calendar.google.com';
        break;
      case 'Laser Cutter':
        $this->calendarId='7mvpfg6rdbc2arhpqfucr2e08k@group.calendar.google.com';
        break;
      case 'Vinyl Cutter':
        $this->calendarId='qa83jtejin79alh5j29euoicd0@group.calendar.google.com';
        break;
      case 'Desktop Mill':
        $this->calendarId='oabegp6r4ser2402nuoavij6f8@group.calendar.google.com';
        break;
      case 'Sewing Machine':
        $this->calendarId='doib9m4ms8fcbbvlsr7i1t4le8@group.calendar.google.com';
        break;
      case 'Electronics Workstations':
        $this->calendarId='atek4qnqophi3fenco44m19v7o@group.calendar.google.com';
        break;
      case 'Yellow 3D Printer':
        $this->calendarId='io11q6ctocms2oero7ibt82nbg@group.calendar.google.com';
        break;
      case 'Magenta 3D Printer':
        $this->calendarId='nclci4qg5igpspkj871omstd24@group.calendar.google.com';
        break;
      case 'Blue 3D Printer':
        $this->calendarId='3c6tjk3t2fdam50m3e5c2lhveg@group.calendar.google.com';
        break;
      case 'Green 3D Printer':
        $this->calendarId='jtucjb65m73gvns2t6oiu5g9n0@group.calendar.google.com';
        break;
      default:
        $this->calendarId='primary';
        break;
    }
  }
  function addEvent(){
    $event=$this->event;
    $service=$this->service;
    $event = $service->events->insert($this->calendarId, $event);
  //  printf('Event created: %s', $event->htmlLink);//you can add this line to print out the link if you need it.
  }
  function eventConflictCheck($startDateTime,$endDateTime){ //send a request to google calendar to check is there a event already on calendar.
    $processed_StartDateTime=$this->dateTimePlusProcess($startDateTime);
    $processed_EndDateTime=$this->dateTimePlusProcess($endDateTime);
    $freebusy_req = new Google_Service_Calendar_FreeBusyRequest();
    $freebusy_req->setTimeMin($processed_StartDateTime);
    $freebusy_req->setTimeMax($processed_EndDateTime);
    $freebusy_req->setTimeZone('America/New_York');
    $item = new Google_Service_Calendar_FreeBusyRequestItem();
    $item->setId($this->calendarId);
    $freebusy_req->setItems(array($item));
    $cal=new Google_Service_Calendar($this->client);
    $query = $cal->freebusy->query($freebusy_req);
    $calendarObj= $query->calendars;
    $calendarName=$calendarObj[$this->calendarId];
    $eventList=$calendarName->busy;
    if(count($eventList)==0){
      return 1;
    }
    else if(count($eventList)==1){
      $inSchedule_Start_InHour=$this->dateTimeListInHourFormat($eventList[0]->start);
      $inSchedule_End_InHour=$this->dateTimeListInHourFormat($eventList[0]->end);
      $startDateTime_InHour=$this->dateTimeListInHourFormat($startDateTime);
      $endDateTime_InHour=$this->dateTimeListInHourFormat($endDateTime);
      if($endDateTime_InHour==$inSchedule_Start_InHour||$startDateTime_InHour==$inSchedule_End_InHour){return 1;}
      else {return 0;}
}
    else if(count($eventList)==2){
      $firstInSchedule_End_InHour=$this->dateTimeListInHourFormat($eventList[0]->end);
      $secondInSchedule_Start_InHour=$this->dateTimeListInHourFormat($eventList[1]->start);
      $startDateTime_InHour=$this->dateTimeListInHourFormat($startDateTime);
      $endDateTime_InHour=$this->dateTimeListInHourFormat($endDateTime);
      if($startDateTime_InHour==$firstInSchedule_End_InHour &&$endDateTime_InHour==$secondInSchedule_Start_InHour){
        return 1;
      }
      else{return 0;}
    }
    else{
      return 0;
    }
  }
  function dateTimePlusProcess($dateTime){ //plus 5 on datetime since dabl calendar is using GMT -5 time zone
    $dateTimeArr=str_split($dateTime);
    $dateStartTime=$dateTimeArr[11].$dateTimeArr[12];
    $dateStartTime=$dateStartTime+"5";
    if(intval($dateStartTime)<10){
      $dateStartTime=array("0",$dateStartTime);
    }
    else{$dateStartTime=str_split($dateStartTime);}
    $dateTimeArr[11]=$dateStartTime[0];
    $dateTimeArr[12]=$dateStartTime[1];
    $newDateTime=implode("", $dateTimeArr);
    return $newDateTime.".000z"; //to make the hour into zulu time format which required by goolge api
  }
  function dateTimeListInHourFormat($dateTime){ //normalize dateTime and make it comparable
    $strList=str_split($dateTime);
    $strInHour=$strList[11].$strList[12].$strList[13].$strList[14].$strList[15]; //make strInHour into "12:00"
    return $strInHour;
  }

}
//----------------test code

   $startDateTime='2019-12-10T01:00:00';
   $endDateTime='2019-12-10T02:00:00';
   $attendeeEmail='ls8513a@student.american.edu';
   $obj=new Event;
   $obj->eventForm($attendeeEmail,$startDateTime,$endDateTime,'Vinyl Cutter');
 //  $obj->addEvent();*/
  echo  $obj->eventConflictCheck($startDateTime,$endDateTime);


?>
