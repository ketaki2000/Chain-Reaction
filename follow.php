<?php 
include("config.php");
error_reporting(0);
$receiver_id=$_GET['receiver_id'];
session_start();
echo "current_user" ,$_SESSION['id'];
echo "\n following_user",$receiver_id;
$sender_id=$_SESSION['id'];

$conn = mysqli_connect("localhost", "root", "", "chain-reaction");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO follow (sender_id, receiver_id)
VALUES ($sender_id,$receiver_id)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

 ?>

