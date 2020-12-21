/*
Copyright (C) <2019> <Design & Build  Lab (DaBL) of American Univeristy>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restricti$

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON$
*/

<?php
class IDatabase{
        private static $servername = "localhost";
        private static $username = "phpUser";
        private static $password = "0000";
        private static $dbname="qss5000x";

        function connectDB(){
                $servername=self::$servername;
                $username=self::$username;
                $password=self::$password;
                $dbname=self::$dbname;

                $conn = new mysqli($servername,$username, $password,$dbname);
                if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
                }
                else{
                        return $conn;
                }
                return Null;
        }
        function fetch_All(){
                $conn=self::connectDB();
                $sql="SELECT * FROM qss5000x.user" ;
                $result=$conn->query($sql);
                if ($result->num_rows>0){
                while($row=$result->fetch_assoc()){
                echo "email: ".$row["email"]." Agreement: ".$row["waiver"]." White Printer: ".$row["series1pro"]." Lasercutter: ".$row["pls475"]." Desktop Mill: ".$row["bantamtools"]
                                ." VinylCutter: ".$row["jaguarvlx"]." Sewing machine: ".$row["sewing"]." ElectronicsWorkstation: ".$row["electronics"]." OtherPrinter: "
                                .$row["thr3dprinter"]."\n";
                        }
                }
                else{echo "No result";}
                $conn->close();
  }
        function search_ByEmail($email){
                $conn=self::connectDB();
                $sql="SELECT * FROM qss5000x.user WHERE email = '$email'";
                $result=$conn->query($sql);
                $row = mysqli_fetch_array($result);
                if($row==Null){
                        return FALSE;
                }
                //echo $result;
                else{
                while($row = mysqli_fetch_array($result))
                {
                        $email=$row["email"];
                        $agreement=$row["waiver"];
                        $whiteprinter=$row["series1pro"];
                        $lasercutter=$row["pls475"];
                        $desktopmill=$row["bantamtools"];
                        $vinylcutter=$row["jaguarvlx"];
                        $sewingmachine=$row["sewing"];
                        $electronics=$row["electronics"];
                        $otherprinter=$row["thr3dprinter"];
                }
                return TRUE;
        }

        }
        function check_Data($email,$colname){
                $conn=self::connectDB();
                $sql="SELECT * FROM qss5000x.user WHERE email = '$email'";
                $result=$conn->query($sql);
                while($row = mysqli_fetch_array($result))
                {
                        $agreement=$row["waiver"];
                        $whiteprinter=$row["series1pro"];
                        $lasercutter=$row["pls475"];
                        $desktopmill=$row["bantamtools"];
                        $vinylcutter=$row["jaguarvlx"];
                        $sewingmacine=$row["sewing"];
                        $electronics=$row["electronics"];
                        $otherprinter=$row["thr3dprinter"];
                }
                        switch($colname){
                                case "agreement":
                                        if($agreement==1){return TRUE;}
                                        else {return FALSE;}
                                case "White 3D Printer":
                                        if($whiteprinter==1){return TRUE;}
                                        else {return FALSE;}
                                case "Laser Cutter":
                                        if($lasercutter==1){return TRUE;}
                                        else {return FALSE;}
                                case "Desktop Mill":
                                        if($desktopmill==1){return TRUE;}
                                        else {return FALSE;}
                                case "Vinyl Cutter":
                                        if($vinylcutter==1){return TRUE;}
                                        else{return FALSE;}
                                case "Sewing Machine":
                                        if($sewingmachine==1){return TRUE;}
                                        else{return FALSE;}
                                case "Electronics Workstations":
                                        if($electronics==1){return TRUE;}
                                        else {return FALSE;}
                                case "Yellow 3D Printer"||"Magenta 3D Printer"||"Blue 3D Printer"||"Green 3D Printer":
                                        if($otherprinter==1){return TRUE;}
                                        else{return FALSE;}


                        }
        }
}

// $obj=new IDatabase;
// $result=$obj->search_ByEmail("ls8513a@american.student.edu");

// $obj->fetch_All();
// $result=$obj->check_Data("ls8513a@american.student.edu","White 3D Printer");
// echo $result;

?>

