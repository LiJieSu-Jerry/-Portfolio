/*
Copyright (C) <2019> <Design & Build  Lab (DaBL) of American Univeristy>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restricti$

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON$
*/
<?php
 include 'Event.php';
 include 'IDatabase.php';
function check_Email($email){
        $obj=new IDatabase;
        $check_Result=$obj->search_ByEmail($email);
        if($check_Result!=Null){return TRUE;}
        else{return FALSE;}
}
function check_Agreement($email){
        $obj=new IDatabase;
        $check_Result=$obj->check_Data($email,"agreement");
        if($check_Result==TRUE){return TRUE;}
        else{return FALSE;}
}
function check_Trained($email,$machineName){
        $obj=new IDatabase;
        $check_Result=$obj->check_Data($email,$machineName);
        if($check_Result==TRUE){return TRUE;}
        else{return FALSE;}
}
function createEvent($email,$startDateTime,$endDateTime,$machineName){
        $obj=new Event;
        $obj->eventForm($email,$startDateTime,$endDateTime,$machineName);
        $isFree= $obj->eventConflictCheck($startDateTime,$endDateTime);
        if($isFree==1){
                $obj->addEvent();
                echo 'YES';
        }
        else{echo 'CONFLICT';}
}

$str=$_GET["result"];
$array=explode(",", $str);
$email=$array[0];
$startDateTime=$array[1];
$email=$array[0];
$startDateTime=$array[1];
$endDateTime=$array[2];
$machineName=$array[3];
/*
   $startDateTime='2019-12-10T13:00:00';
   $endDateTime='2019-12-10T14:00:00';
$email='ls8513a@american.student.edu';
$machineName='Vinyl Cutter';
*/
//echo createEvent($email,$startDateTime,$endDateTime,$machineName);


if(check_Email($email)){
        if(check_Agreement($email)){
                if(check_Trained($email,$machineName)){
                        createEvent($email,$startDateTime,$endDateTime,$machineName);
                }
                else{echo 'NO';}
        }
        else{echo 'NO';}
}
else{echo "<script>alert('I am an alert box!');</script>";}

?>
