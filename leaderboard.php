<!DOCTYPE html>
<html>
<head>
<title>Leaderboard</title>

<style>


tr:hover {background-color:#f5f5f5;}

	#follow-button {
  color: #3399FF;
  font-family: "Helvetica";
  font-size: 10pt;
  background-color: #ffffff;
  border: 1px solid;
  border-color: #3399FF;
  border-radius: 3px;
  width: 85px;
  height: 30px;
  	    
}
.btn {
  background-color: #ddd;
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  font-family: monospace;
  transition: 0.3s;
}

.btn:hover {
  background-color: #19B7E7;
  color: white;
}
table {
border-collapse: collapse;
width: 100%;
color: #588c7e;
font-family: monospace;
font-size: 25px;
text-align: left;
}
th {
background-color: #588c7e;
color: white;
}
tr:nth-child(even) {background-color: #f2f2f2}
</style>
</head>
<body>
<table>
<tr>
<th>Rank</th>
<th>Id</th>
<th>Username</th>
<th>Score</th>
<th>Follow</th>

</tr>
<?php
$conn = mysqli_connect("localhost", "root", "", "chain-reaction");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT ROW_NUMBER() OVER (order by score DESC) AS rank ,id, username, score FROM leaderboard ";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {

echo "<tr><td>" . $row["rank"]. "</td><td>" . $row["id"] . "</td><td>" . $row["username"] . "</td>
<td>". $row["score"]. "</td>
<td> <a href='follow.php?receiver_id=$row[id]'><input type='submit' value='+ Follow' class='btn'></td>

</tr>";
}
echo "</table>";
} else { echo "0 results"; }
$conn->close();
?>
</table>
</body>
</html>