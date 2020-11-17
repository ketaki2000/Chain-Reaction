<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
		header("location: login.php");
		exit;
}
$id=$_SESSION["id"];
/*echo $id;
$idSQL="select receiver_id from follow where sender_id='$id' " ;
$rs = mysql_query($idSQL);

while($row = mysql_fetch_array($rs)){
echo $row['receiver_id'];
}
while($ids){
	if ids[receiver_id]==feed[user_id]{
		echo "feed[username]"
		echo "feed[status] against feed[opponent]";

	}
}*/
?>

<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
		<title><?php echo htmlspecialchars($_SESSION["username"]); ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">

		<meta name="author" content="templatemo">
		<meta charset="UTF-8">

		<link href='http://fonts.googleapis.com/css?family=Dosis:300,400,500,600,700,800' rel='stylesheet' type='text/css'>
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
		<link href="css/font-awesome.min.css" rel="stylesheet" media="screen">
		<link rel="stylesheet" href="css/templatemo_misc.css">
		<link rel="stylesheet" href="css/animate.css">
		<link href="css/templatemo_style.css" rel="stylesheet" media="screen">
		<link rel="shortcut icon" href="images/ico/favicon.ico">
	
		<script src="js/jquery-1.10.2.min.js"></script>
		<script src="js/modernizr.js"></script>
<script>function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.innerHTML === "+ Follow") {
    x.innerHTML = "Following";
  } else {
    x.innerHTML = "+ Follow";
  }
}</script>
		<style>
			.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

}

.container {
  padding: 2px 16px;
border-right: 4px;
}
			
			table {
				margin: auto;
  border-collapse: separate;
  border-spacing: 120px 0;
}
img {
    width:  150px;
    height: 150px;
    object-fit: cover;
}

td {
  padding: 10px 0;
}
			.padding-table-columns td
{
    padding:0 15px 0 0; /* Only right padding*/
}
			.nav-pills > li.active > a, .nav-pills > li.active > a:focus {
					color: black;
					background-color: #fcd900;
			}

			.nav-pills > li.active > a:hover {
					background-color: #efcb00;
					color:black;
			}
		</style>
</head>

<body>
		<div class="overlay-bg"></div>

		<!-- This one in here is responsive menu for tablet and mobiles -->
		<div class="responsive-navigation visible-sm visible-xs">
				<a href="#" class="menu-toggle-btn">
						<i class="fa fa-bars fa-2x"></i>
				</a>
				<div class="responsive_menu">
						<ul class="main_menu">
								<li><a class="show-1 homebutton" href="#"><i class="fa fa-home"></i>Homepage</a></li>
								<li><a class="show-2" href="#"><i class="fa fa-group"></i>Matches</a></li>
								<li><a href="game.php" target="_blank"><i class="fa fa-gamepad"></i>Play now!!</a></li>
								<li><a href="reset-password.php"><i class="fas fa-user-lock"></i>Reset Password</a></li>
								<li><a href="logout.php"><i class="fa fa-sign-out"></i>Log out</a></li>
						</ul> <!-- /.main_menu -->
				</div> <!-- /.responsive_menu -->
		</div> <!-- /responsive_navigation -->

		<div class="main-content">
				<div class="container">
						<div class="row">

								<!-- Static Menu -->
								<div class="col-md-2 visible-md visible-lg">
										<div class="main_menu">
												<ul class="menu">
														<li><a class="show-1 homebutton" href="#" data-toggle="tooltip" data-original-title="Homepage"><i class="fa fa-home"></i></a></li>
														<li><a class="show-2" href="#" data-toggle="tooltip" data-original-title="Matches"><i class="fa fa-group"></i></a></li>
														<li><a href="game.php" target="_blank" data-toggle="tooltip" data-original-title="Play now!!"><i class="fa fa-gamepad"></i></a></li>
																						<li><a href="reset-password.php" data-toggle="tooltip" data-original-title="Reset Password"><i class="fa fa-refresh "></i></a></li>

														<li><a href="logout.php" data-toggle="tooltip" data-original-title="Log out"><i class="fa fa-sign-out"></i></a></li>
												</ul>
										</div> <!-- /.main-menu -->
								</div> <!-- /.col-md-2 -->

								<!-- Begin Content -->
								<div class="col-md-10">

										<div class="row">
												<div class="col-md-12">
													<div style="text-align: center;">
														<h1>
															<b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>
														</h1>
													</div>

												</div> <!-- /.col-md-12 -->
										</div> <!-- /.row -->

										<div id="menu-container">

											<!-- home page begins -->
											<div id="menu-1" class="homepage">
												<div class="page-header">
													<h2 class="page-title" >My Feed</h2>
												</div> <!-- /.page-header -->
												<div class="content-inner">
													<div class="row">
														<div class="container">
															<ul class="nav nav-pills nav-justified red">
																<li class="active"><a data-toggle="pill" href="#home">Following</a></li>
																<li><a data-toggle="pill" href="#menu1">Leaderboard</a></li>
															</ul>

															<div class="tab-content">
																<div id="home" class="tab-pane fade in active">
																	<h5>My dear friends.</h5>
																	<?php
$conn = mysqli_connect("localhost", "root", "", "chain-reaction");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql1 = "SELECT receiver_id from follow where sender_id=6  ";
$result1 = $conn->query($sql1);
if ($result1->num_rows > 0) {
// output data of each row
while($row = $result1->fetch_assoc()) {

$rid= $row["receiver_id"];
$sql2 = "SELECT * from feed where user_id='$rid'  ";
$result2 = $conn->query($sql2);
if ($result2->num_rows > 0) {
// output data of each row
while($row = $result2->fetch_assoc()) {
//echo "<img src=".$row["image"]." alt="Avatar" style="width:150px">";
	echo "<div class=card >
  <img src=".$row["image"]."  style='width:150px'/>
  <div class=container class='f' style='float:right;'>
    <h3><b>".$row["username"]."</b></h3> 
    <h4>".$row["status"]." against ".$row["opponent"]."</h4> 
  </div>
</div>";
/*echo '<img src="'.$row["image"].'" alt="Avatar" style="width:100px" style="float:left;"/><span> '.$row["username"].'</span>';
echo '<h1 >'.$row["username"].'</h1>' ;
echo '<h2>'.$row["status"].' against '.$row["opponent"].'</h2>' ;*/
echo "<hr>";
} }
} }
else { echo "0 results"; }
$conn->close();
?>
																</div>
																<div id="menu1" class="tab-pane fade">
																	<h3>Top 10 players past week</h3>
																	<table>
<tr>
<th>Rank</th>
<th>Id</th>
<th>Username</th>
<th>Score</th>
<th>Follow</th>

</tr>
<?php
$sender_id=$_SESSION['id'];
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

$sql3 = "SELECT receiver_id FROM follow where sender_id='$sender_id'  ";
$result3 = $conn->query($sql3);

if ($result3->num_rows > 0){
	//if $receiver_id=$row[id]
	$x='Following';}
	else{$x='+ Follow';}
echo "<tr><td>" . $row["rank"]. "</td><td>" . $row["id"] . "</td><td>" . $row["username"] . "</td>
<td>". $row["score"]. "</td>
<td> <a href='follow.php?receiver_id=$row[id]'><input type='submit' id=myDIV onclick=myFunction() value='$x' class='btn'></td>

</tr>";
}
echo "</table>";
} else { echo "0 results"; }
$conn->close();
?>
</table>
																</div>
															</div>
														</div>
														</div><!-- row -->
													</div><!-- content-inner -->
												</div><!-- /.homepage -->

												<!-- matches played yet -->
												<div id="menu-2" class="content">
														<div class="page-header">
																<h2 class="page-title" >Matches Played</h2>
														</div> <!-- /.page-header -->
														<div class="content-inner">
															<div class="row">
																<div class="container">
																	<ul class="nav nav-pills nav-justified red">
																		<li class="active"><a data-toggle="pill" href="#home">Vs AI bot</a></li>
																		<li><a data-toggle="pill" href="#menu1">Vs Other Players</a></li>
																	</ul>

																	<!-- tab content -->
																	<div class="tab-content">
																		<div id="home" class="tab-pane fade in active">
																			<h3>Score Against Bot</h3>
																			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
																		</div>
																		<div id="menu1" class="tab-pane fade">
																			<h3>Score Against Other Players</h3>
																			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
																		</div>
																	</div><!-- tab content -->
																</div>
															</div> <!-- /.row -->
														</div> <!-- /.content-inner -->
													</div> <!-- /.matches played -->

												<div class="site-footer">
														<div class="row">
																<div class="col-md-6">
																		<!--p class="copyright-text">All rights reserved by the owners of this repository
																		</p-->
																</div>
																<div class="col-md-6">
																		<div class="social-icons-footer">
																				<ul>
																						<li><a target="_parent" href="https://github.com/ketaki2000/Chain-Reaction/tree/master" class="fa fa-facebook"></a></li>
																						<li><a href="https://github.com/ketaki2000/Chain-Reaction/tree/master" class="fa fa-linkedin"></a></li>
																						<li><a href="https://github.com/ketaki2000/Chain-Reaction/tree/master" class="fa fa-github"></a></li>
																				</ul>
																		</div>
																</div>
														</div>
												</div> <!-- /.site-footer -->

										</div> <!-- /.content-holder -->
								
								</div> <!-- /.col-md-10 -->
						</div> <!-- /.row -->
				</div> <!-- /.container -->
		</div> <!-- /.main-content -->

		<script src="bootstrap/js/bootstrap.min.js"></script>

		<script src="js/jquery.mixitup.min.js"></script>
		<script src="js/jquery.nicescroll.min.js"></script>
		<script src="js/jquery.lightbox.js"></script>
		<script src="js/templatemo_custom.js"></script>
<!-- templatemo 402 genius -->
</body>
</html>