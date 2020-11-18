

$(document).ready(function(){

    var canvas = $("#myCanvas")[0];
    var ctx = canvas.getContext("2d");
    var GridStartX = 10;
    var GridStartY = 10;
    var GridEndX = canvas.width - 10;
    var GridEndY = canvas.height - 10;
    var HorizontalDistanceBetween2Lines = -1;
    var VerticalDistanceBetween2Lines = -1;
    var balls = [];
    var x = 10//center x coordinate for first circle
    var y = 10//center y coordinate for second circle
    var dx = 0;
    var dy = 0;
    var grid = [];
    var colors = ['#934D0D','#0C910C'];//#E9DB77
    var players = [];
    var total_players = 2;//By Deafult number of players
    var currentPlayer = 0;//by default current player is first
    var to_animate = [];
    var lock = false;
    var animateFlag = false;
    var Rows = 8;//y axis
    var Columns = 8;//x axis
    var to_translate = [];
    var iter_translate = 0;
    var dx1=4;
    var dy1=4;
    var GameOverFlag = false;
    var iter_GameOver = 0;
    /*
    In x,y corrdinate space
    row = y axis
    column = x axis
    */
    var canvasarray=[];
    
    //for player1
    var t1Canvas = document.createElement('canvas');
    t1Canvas.width = 20;
    t1Canvas.height = 20;
    var t1Ctx = t1Canvas.getContext('2d');
    var radius = t1Canvas.width / 2;
    var t1Grad = t1Ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    t1Grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    t1Grad.addColorStop(0.2, 'rgba(255, 195, 85, 1)');
    t1Grad.addColorStop(0.95, 'rgba(128, 56, 0, 1)');
    t1Grad.addColorStop(1, 'rgba(128, 56, 0, 0)');
    t1Ctx.fillStyle = t1Grad;
    t1Ctx.fillRect(0, 0, t1Canvas.width, t1Canvas.height);
    canvasarray.push(t1Canvas);
    
    
    //for player2
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = 20;
    tmpCanvas.height = 20;
    var tmpCtx = tmpCanvas.getContext('2d');
    var radius = tmpCanvas.width / 2;
    var tmpGrad = tmpCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    tmpGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    tmpGrad.addColorStop(0.2, 'rgba(85, 255, 85, 1)');
    tmpGrad.addColorStop(0.95, 'rgba(0, 128, 0, 1)');
    tmpGrad.addColorStop(1, 'rgba(0, 128, 0, 0)');
    tmpCtx.fillStyle = tmpGrad;
    tmpCtx.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);
    canvasarray.push(tmpCanvas);
    
    
    
    function Player(id,color)
    {
        this.id = id;
        this.color = color;
        this.printPlayerInfo = function(){
            console.log("Player id: "+this.id+" and color is: "+this.color);
        }
    }
    function initializePlayers(num=2)
    {
        //console.log("initialize players is called");
        total_players = num;
    
        for(count = 0;count<num;++count)
        {
            players[count] = new Player(count,colors[count]);
        }
        //currentPlayer = players[0];
    }
    //Always call it after DrawGrid()
    function initializeGrid(rows,columns)//grid[r][c] = top left cordinates for r,c box
    {
        //console.log("initilizegrid is called");
        var x1 = 10;
        var y1 = 10;
        var xdis = HorizontalDistanceBetween2Lines;
        var ydis = VerticalDistanceBetween2Lines;
        for(c = 0;c < columns; ++c)
        {
            grid[c] = [];
            for(r = 0;r < rows; ++r)
            {
                grid[c][r]={x:x1+c*xdis,y:y1+r*ydis};
            }
        }
    }
    
    function DrawVerticalLines(num,x,y)
    {
        //console.log("drawverticalline is called");
        var DistanceBetween2Lines = (canvas.width-20)/num;
        var StartX = GridStartX+x;
        var StartY = GridStartY+y;
        var EndX = GridStartX+x;
        var EndY = GridEndY+y;
        ctx.beginPath();
        for(count = 0; count <= num; ++count)
        {
            ctx.moveTo(StartX,StartY);
            ctx.lineTo(StartX,EndY);
            StartX = StartX + DistanceBetween2Lines;
        }
        ctx.strokeStyle = players[currentPlayer].color ;
        ctx.stroke();
        ctx.closePath();
        return DistanceBetween2Lines;
    
    
    }
    
    function DrawHorizontalLines(num,x,y)
    {
        //console.log("drawhorizontalline is called");
        var DistanceBetween2Lines = (canvas.height - 20)/num;
        var StartX = GridStartX+x;
        var StartY = GridStartY+y;
        var EndX = GridEndX+x;
        var Endy = GridStartY+y;
    
        ctx.beginPath();
        for(count = 0 ;count <= num ;++count)
        {
            ctx.moveTo(StartX,StartY);
            ctx.lineTo(EndX,StartY);
            StartY = StartY + DistanceBetween2Lines;
    
        }
        ctx.strokeStyle = players[currentPlayer].color;
        ctx.stroke();
        ctx.closePath();
        return DistanceBetween2Lines;
    }
    //It should be the first function to be called
    function DrawGrid(rows,columns,x,y)
    {
        //console.log("drawgrid is called");
        HorizontalDistanceBetween2Lines = DrawVerticalLines(columns,x,y);
        VerticalDistanceBetween2Lines = DrawHorizontalLines(rows,x,y);
        return Math.min(HorizontalDistanceBetween2Lines,VerticalDistanceBetween2Lines);
    }
    
    function intializeBalls(rows,columns)//Status  = 0 means box is empty
    {
        //console.log("initialize balls is called");
        for(c = 0;c < columns; ++c)
        {
            balls[c] = [];
            for(r = 0;r < rows; ++r)
            {
                balls[c][r] = {x:0,y:0,Status:0,player_id:0};
            }
        }
    }
    function DrawBall(x,y,radius,player_id)
    {
            //console.log("draw ball is called");
            //console.log("player id is :",player_id);
            ctx.beginPath();
            ctx.drawImage(canvasarray[player_id], x - radius, y - radius, radius<<1, radius<<1);
            ctx.closePath();	
        
    }
    //x1,y1 corresponds to left start grid
    //only call it after mouse click detected
    function DrawBalls(rows,columns,ballRadius,x1,y1)
    {
        //console.log("drawballs is called");
    
        var x = x1+HorizontalDistanceBetween2Lines/2;
        var y = y1+VerticalDistanceBetween2Lines/2;
        //color = "#0095DD";
        
    
        for(r = 0;r < rows; ++r)
        {
            for(c =0 ;c < columns; ++c)
            {
                balls[c][r].x = x + c * HorizontalDistanceBetween2Lines;
                balls[c][r].y = y + r * VerticalDistanceBetween2Lines;
                if(balls[c][r].Status == 1)
                {
                    //console.log("Ball Drawn at ",r," ",c);
                    DrawBall(balls[c][r].x,balls[c][r].y,ballRadius,balls[c][r].player_id);
                }
                else if(balls[c][r].Status == 2)
                {
                    //console.log("Ball Drawn at ",r," ",c);
                    DrawBall(balls[c][r].x,balls[c][r].y,ballRadius,balls[c][r].player_id);
                    DrawBall(balls[c][r].x-10,balls[c][r].y,ballRadius,balls[c][r].player_id);
                }
                else if(balls[c][r].Status == 3)
                {
                    //console.log("Ball Drawn at ",r," ",c);
                    DrawBall(balls[c][r].x,balls[c][r].y,ballRadius,balls[c][r].player_id);
                    DrawBall(balls[c][r].x-10,balls[c][r].y,ballRadius,balls[c][r].player_id);
                    DrawBall(balls[c][r].x,balls[c][r].y-10,ballRadius,balls[c][r].player_id);
                }
            }
        }
        
        
    
    }
    function CheckStatus(rows,columns)
    {
        //console.log("checkStatus is called");
        var flag = false;
        for(r = 0;r < rows; ++r)
        {
            for(c = 0;c < columns; ++c)
            {
                if((r==0&&c==0)||(r==0&&c==Columns-1)||(r==Rows-1&&c==0)||(r==Rows-1&&c==Columns-1))
                {
                    if(balls[c][r].Status >= 2)
                    {
                        //console.log("animate for two "+r+" "+c);
                        to_animate.push({x:c,y:r,id:balls[c][r].player_id});//inserting box number
                        balls[c][r].Status-=2;
                        if(balls[c][r].Status==0)
                        balls[c][r].player_id = 0;
                        flag = true;
                        //console.log("Status == 4 found at ",r," ",c);
                    }
                }
                else if(((r==0||r==Rows-1)&&(c>0&&c<Columns-1))||((c==0||c==Columns-1)&&(r>0&&r<Rows-1)))
                {
                    if(balls[c][r].Status>=3)
                    {
                        to_animate.push({x:c,y:r,id:balls[c][r].player_id});//inserting box number
                        balls[c][r].Status-=3;
                        if(balls[c][r].Status==0)
                        balls[c][r].player_id = 0;
                        flag = true;
                        //console.log("Status == 4 found at ",r," ",c);
                    }
                }
                else if(balls[c][r].Status>=4)
                {
                    to_animate.push({x:c,y:r,id:balls[c][r].player_id});//inserting box number
                    balls[c][r].Status-=4;
                    if(balls[c][r].Status==0)
                    balls[c][r].player_id = 0;
                    flag = true;
                    //console.log("Status == 4 found at ",r," ",c);
                }
            }
        }
        return flag;
    }
    //func(column,row)->It checks if given row,column is within grid or not.
    function func(column,row)
    {

        if(column>=0&&column<Columns&&row>=0&&row<Rows)
            return true;
        else
            return false;
    }
    function bfs()
    {
        //console.log("bfs is called");
        for(i = 0;i < to_animate.length; ++i)
        {
            var x1 = to_animate[i].x;
            var y1 = to_animate[i].y;
            var id = to_animate[i].id;
            if(func(x1+1,y1))
            {
                //console.log("Increasing Row y",x1," ",y1);
                to_translate.push({x:x1,y:y1,a:1,b:0,id:id});
            }
            if(func(x1-1,y1))
            {
                //console.log("Decreasing  Row y",x1," ",y1);
                to_translate.push({x:x1,y:y1,a:-1,b:0,id:id});
            }
            if(func(x1,y1+1))
            {
                //console.log("Increasing Columns x",x1," ",y1);
                to_translate.push({x:x1,y:y1,a:0,b:1,id:id});
            }
            if(func(x1,y1-1))
            {
                //console.log("Decreasing  Columns x",x1," ",y1);
                to_translate.push({x:x1,y:y1,a:0,b:-1,id:id});
            }
            
        }
    }
    function DrawBallTraversal(ballRadius)
    {
        //.log("drawballtraversal is called");
        for(i = 0;i < to_translate.length ;++i)
        {
            var x1 = to_translate[i].x;
            var y1 = to_translate[i].y;
            var id = to_translate[i].id;
            var a = to_translate[i].a;
            var b = to_translate[i].b;
            var x = balls[x1][y1].x;
            var y = balls[x1][y1].y;
            x = x + a*dx1;
            y = y + b*dy1;
            DrawBall(x,y,ballRadius,id);
            
        }
    }
    function updateStatus(x,y,id)
    {
        //console.log("Status updated for ",x," ",y);
        //console.log("updateStatus is called");
        balls[x][y].Status+=1;
        balls[x][y].player_id=id;
    }
    function updateNeighbour()
    {
        //console.log("updateNeighbour is called");
        for(i = 0;i < to_animate.length; ++i)
        {
            var x1 = to_animate[i].x;
            var y1 = to_animate[i].y;
            var id = to_animate[i].id;
            if(func(x1+1,y1))
            {
                //console.log("Going for Status update for ",x1+1," ",y);
                updateStatus(x1+1,y1,id);
            }
            if(func(x1-1,y1))
            {
                updateStatus(x1-1,y1,id);
            }
            if(func(x1,y1+1))
            {
                updateStatus(x1,y1+1,id);
            }
            if(func(x1,y1-1))
            {
                updateStatus(x1,y1-1,id);
            }
            
        }
    }
    function GameOver()
    {
        var p1=-1;
        var p2=-1;
        for(r = 0;r<Rows; ++r)
        {
            for(c = 0;c<Columns;++c)
            {
                if(balls[c][r].Status>0)
                {
                    if(p1==-1)
                    {
                        p1=balls[c][r].player_id;
                    }
                    else if(balls[c][r].player_id != p1)
                    {
                        p2=balls[c][r].player_id;
                        break;
    
                    }
                }
    
            }
            if(p2!=-1)
            {
                break;
            }
        }
        if(p2==-1)
        {
            p1++;
            
            //document.location.reload();
            return p1;
    
        }
        return 0;
    }
    function Draw()
    {
        console.log("Draw is called");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        MaxDiameter = DrawGrid(Rows,Columns,0,0);
        DrawGrid(Rows,Columns,4,4);
    
        var ballRadius = MaxDiameter/6;
        
        //console.log("MaxDiameter of circles can be "+MaxDiameter+" px");
        
        //x+=dx;
        //y+=dy;
        var xdis = HorizontalDistanceBetween2Lines/2;
        var ydis = VerticalDistanceBetween2Lines/2;
        if(animateFlag||CheckStatus(Rows,Columns))
        {
            if(!animateFlag)
            {
                //console.log("goind to do bfs");
                bfs();
                iter_translate = 0;
                dx1 = 2;
                dy1 = 2;
                animateFlag = true;
            }
            else if(iter_translate<10)
            {
                //console.log("Doing ball traversal animation");
                DrawBallTraversal(ballRadius);
                dx1+=2;
                dy1+=2;
                iter_translate++;
            }
            else
            {
                //console.log("Updating Neighbour Status");
                updateNeighbour();
                to_animate = [];
                to_translate = [];
                animateFlag = false;
                iter_translate = 0;
                GameOverFlag = GameOver();
            }
        }
    
        DrawBalls(Rows,Columns,ballRadius,x,y);
        if(GameOverFlag)
        {
            if(iter_GameOver==20)
            {
                alert("GameOver Player number "+GameOverFlag+" wins");
                window.location.reload();
            }
            iter_GameOver++;
        }
        
        /*if(x+ballRadius+xdis>HorizontalDistanceBetween2Lines||x+xdis<ballRadius||y+ballRadius+ydis>VerticalDistanceBetween2Lines||y+ydis<ballRadius)
        {
            dx=-dx;
            dy=-dy;
        }*/
        
        //dx=-dx;
        //dy=-dy;
        requestAnimationFrame(Draw);
    }
    
    
    
    
    
    function init()
    {
        console.log("init is called")
        initializePlayers(2);
        intializeBalls(Rows,Columns);
        Draw();
        initializeGrid(Rows,Columns);
        
    }
    init();
    //setInterval(Draw,40);
    //canvas.addEventListener("click",mouseClickHandler,false);
    
    function BoxDetect(x,y,rows,columns)
    {
        //console.log("Boxdetect is called");
        xdis = HorizontalDistanceBetween2Lines;
        ydis = VerticalDistanceBetween2Lines;
        var flag = 0;
        for(r = 0;r < rows; ++r)
        {
            for(c =0 ;c < columns; ++c)
            {
                x1=grid[c][r].x ;
                y1=grid[c][r].y ;
                if(x1<=x&&x<=x1+xdis&&y1<=y&&y<=y1+ydis)
                {
                    //console.log("Touch found at ",r," ",c);
                    if(balls[c][r].Status == 0)
                    {
                        balls[c][r].Status = 1;
                        balls[c][r].player_id = currentPlayer;
                        currentPlayer = (currentPlayer+1)%2;
                        flag = 1;
                        
                    }
                    else if(currentPlayer == balls[c][r].player_id)
                    {
                        balls[c][r].Status++;
                        currentPlayer = (currentPlayer+1)%2;
                        flag = 1;
                        
                    }
                   
                    
                }
                if(flag)
                {
    
                    break;
    
                }
    
            }
        }
    
    }
    
    
    
    
    var temp = $("#myCanvas");
    
    temp.on( "click", function( event ) {
     console.log( "pageX: " + event.pageX + ", pageY: " + event.pageY );
      var offset = temp.offset();
      //console.log("left: "+offset.left+" ,top: "+offset.top);
      var relativeX = event.pageX-offset.left;
      var relativeY = event.pageY-offset.top;
      //console.log("x: "+relativeX+" ,y: "+relativeY);
      BoxDetect(relativeX,relativeY,Rows,Columns);
      
      setTimeout(function(){
        var t = aimove(balls);//r,c 
        updateStatus(t[0],t[1],currentPlayer);
        setTimeout(function()
        {
            currentPlayer = (currentPlayer+1)%2;
        },1000);
      },1000);
    });
    
    
    
    
    function aimove(position)
    {
        console.log("aimove is called!");
        console.log(JSON.stringify({'position':position}));
        var original = JSON.parse(JSON.stringify(position));
        var k=-Infinity;
        var I,J,i,j;
        for(i=0;i<8;i++)
        {
            for(j=0;j<8;j++)
            {
                if(original[i][j].Status==0 || original[i][j].player_id==1)
                {
                    
                    var temp = JSON.parse(JSON.stringify(position));
                    var t = minimax(aibfs(temp,i,j,1),2,-Infinity,Infinity,0);
                    if(t>k)
                    {
                        I=i;
                        J=j;
                        k=t;
                    }
                }
            }
        }
        console.log(I,J);
        return [I,J];
    }
    function getCriticalMass(i,j)
    {
        console.log("getcriticalmass is called");
        
        if((i==0 && j==0 )|| (i==0 && j==Columns-1) || (i==Rows-1 && j==0) || (i=Rows-1 && j==Columns-1))
        {
            return 2;
        }
        if(((i==0||i==7)&&(j>0&&j<7))||((j==0||j==7)&&(i>0&&i<7)))
        {
            return 3;
        }
        return 4;
    }
    function checkEnemyCriticalCells(position,I,J,player)
    {
        console.log("checkEnemyCriticalCells is called");
        console.log(JSON.stringify({'position':position}));
        x = [0,0,1,-1]
        y = [-1,1,0,0]
        for(k=0;k<4;k++)
        {
            if(func(I+x[k],J+y[k]) &&  position[I+x[k]][J+y[k]].player_id==((player+1)%2) && position[I+x[k]][J+y[k]].Status == getCriticalMass(I+x[k],J+y[k]))
            {
                return true;
            }
        }
        return false;
    }
    function evaluation(position,player)
    {
        console.log("evaluation is called");
        console.log(JSON.stringify({'position':position}));
        /*if(gameover(position) && player==0)
        {
            return -10000;
        }
        if(gameover(position) && player==1)
        {
            return +10000;
        }*/
        value = 0;
        for (i=0;i<8;i++)
        {
            for(j=0;j<8;j++)
            {
                if(position.player_id==player)
                {
                    value+=1;
                    /*
                    if(checkEnemyCriticalCells(position,i,j,player))
                    {
                        value-=(5-getCriticalMass(i,j));
                    }
                    else
                    {
                        if(getCriticalMass(i,j)==2)
                        {
                            value+=3;
                        }
                        else if(getCriticalMass(i,j)==3)
                        {
                            value+=2;
                        }
                        if(position[i][j].Status == getCriticalMass(i,j))
                        {
                            value+=2;
                        }
                    }
                    if(position[i][j].Status == getCriticalMass(i,j))
                       {
                            value+=2;
                        } 
                        */
                }
            }
        }
        if(player==1)
        {
            return value;
        }
        return -value;
    }
    
    function aibfs(position,I,J,player)
    {
        console.log("aibfs is called");
        console.log("I:"+I+",J:"+J);
        console.log(JSON.stringify({'position':position}));
        var original = JSON.parse(JSON.stringify(position));
        original[I][J].Status++;  
        original[I][J].player_id=player;
        console.log(JSON.stringify({'position':original}));
        console.log(JSON.stringify({'position':position}));
        queue = []
        queue.push([I,J]);
        x = [0,0,1,-1]
        y = [-1,1,0,0]
        while(queue.length>0)
        {
            firstElement = queue[0];
            var i = firstElement[0];
            var j = firstElement[1];
            queue.shift();
            if((i==0 && j==0 )|| (i==0 && j==7) || (i==7 && j==0) || (i==7 && j==7))
            {
                if(original[i][j].Status>=2)
                {
                    for(k=0;k<4;k++)
                    {
                        if(func(i+x[k],j+y[k]))
                        {
                            original[i][j].Status=0;
                            original[i+x[k]][j+y[k]].Status++;
                            original[i+x[k]][j+y[k]].player_id=original[i][j].player_id;
                            queue.push([i+x[k],j+y[k]]);
                        }
                    }
                }
                
            }
            else if(((i==0||i==7)&&(j>0&&j<7))||((j==0||j==7)&&(i>0&&i<7)))
            {
                if(original[i][j].Status>=3)
                {
                    for(k=0;k<4;k++)
                    {
                        if(func(i+x[k],j+y[k]))
                        {
                            original[i][j].Status=0;
                            original[i+x[k]][j+y[k]].Status++;
                            original[i+x[k]][j+y[k]].player_id=original[i][j].player_id;
                            queue.push([i+x[k],j+y[k]]);
                        }
                    }
                    
                }
            }
            else if(original[i][j].Status>=4)
            {
                for(k=0;k<4;k++)
                {
                    if(func(i+x[k],j+y[k]))
                    {
                        original[i][j].Status=0;
                        original[i+x[k]][j+y[k]].Status++;
                        original[i+x[k]][j+y[k]].player_id=original[i][j].player_id;
                        queue.push([i+x[k],j+y[k]]);
                    }
                }
            }
        }
        return original;
        
    }
    function moveGen(position,player)
    {
        console.log("movegen is called");
        console.log(JSON.stringify({'position':position}));
        var original = JSON.parse(JSON.stringify(position));
        var movegen = [];
        for(i=0;i<8;i++)
        {
            for(j=0;j<8;j++)
            {
                if(original[i][j].Status==0 || original[i][j].player_id==player)
                {
                    console.log("movegen loop called");
                    var temp = JSON.parse(JSON.stringify(position)); 
                    console.log(JSON.stringify({'temp':temp}));
                    movegen.push(aibfs(temp,i,j,player));
                }
            }
        }
        return movegen;
    }
    function gameover(position)
    {
        console.log("gameover is called");
        console.log(JSON.stringify({'position':position}));
        var p1=-1;
        var p2=-1;
        for(r = 0;r<8; ++r)
        {
            for(c = 0;c<8;++c)
            {
                if(position[c][r].Status>0)
                {
                    if(p1==-1)
                    {
                        p1=position[c][r].player_id;
                    }
                    else if(position[c][r].player_id != p1)
                    {
                        p2=position[c][r].player_id;
                        return false;
    
                    }
                }
    
            }
            
        }
        
        return true;
    }
    function minimax(position,depth,alpha,beta,maximizingPlayer)
    {
        console.log("minimax is called");
        console.log(JSON.stringify({'position':position}));
        if(depth==0 || gameover(position))
        {
            
            return evaluation(position,maximizingPlayer);
            
        }

        if (maximizingPlayer)
        {
            var maxEval = -Infinity;
            var children  = moveGen(position,1);
            for(child=0;child<children.length;child++)
            {
                eval = minimax(children[child],depth-1,alpha,beta,0);
                maxEval = Math.max(maxEval,eval);

                alpha = Math.max(alpha,eval);
                if(beta<=alpha)
                {
                    break;
                }
                return maxEval;
            }
        }
        else
        {
            var minEval = +Infinity;
            var children  = moveGen(position,0);
            for(child=0;child<children.length;child++)
            {
                eval = minimax(children[child],depth-1,alpha,beta,1);
                minEval = Math.min(minEval,eval);

                beta = Math.min(beta,eval);
                if(beta<=alpha)
                {
                    break;
                }
                return minEval;
            }
        }
    }
    });