<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
		header("location: login.php");
		exit;
}

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

		<style>
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
																	<h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
																</div>
																<div id="menu1" class="tab-pane fade">
																	<h3>Top 10 players past week</h3>
																	<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
																		<p class="copyright-text">All rights reserved by the owners of this repository
																		</p>
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