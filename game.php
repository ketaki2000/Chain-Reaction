<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
Hey, welcome to the game!
<canvas id="myCanvas" height="360px" width="360px"></canvas>
<script>
    window.addEventListener("load",function(){
    var conn = new WebSocket('ws://localhost:8080');
    console.log(conn);
    conn.onopen = function(e) {
        console.log("Connection established!");
       
    };

    conn.onmessage = function(e) {
        console.log(e.data);
    };
    }
    );
    
   </script> 
   <script type="text/javascript" src="myscript.js"></script>
</body>
</html>