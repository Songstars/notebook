;
window.onload = function() {
    //获取标签元素
    function $(idName) {
        return document.getElementById(idName);
    }
    //获取需要使用的标签元素
    function getStyle(ele, attr) {
        var res = null;
        if (ele.currentStyle) {
            res = ele.currentStyle[attr]
        } else {
            res = window.getComputedStyle(ele, null)[attr];
        }
        return parseFloat(res);
    }
    // 游戏开始的界面
    //获取需要使用的标签元素
    var game = $("game"),
        // 进入游戏的界面
        gameStart = $("gameStart"),
        gameEnter = $("gameEnter"),
        myPlanet = $("myPlane"),
        bulletsP = $("bullets"),
        enemysP = $("enemys")
        // 获取需要使用的元素的样式
        // 1. 获取游戏界面的宽高
    var gameW = getStyle(game, "width");
    var gameH = getStyle(game, "height");
    //2. 游戏界面的左上外边距
    var gameML = getStyle(game, "marginLeft");
    var gameMT = getStyle(game, "marginTop");
    //3. 获取己方飞机的宽高
    var myPlaneW = getStyle(myPlane, "width");
    var myPlaneH = getStyle(myPlane, "height");
    // 声明需要使用的全局变量
    var gameStatus = false; //当前的游戏状态
    var a = null; //创建子弹的定时器
    var bulletW = 6;
    var bulletH = 14;


    // 开始游戏
    gameStart.firstElementChild.onclick = function() {
            gameStart.style.display = "none";
            gameEnter.style.display = "block";
            // 给当前的文档添加键盘事件
            document.onkeyup = function(evt) {
                // 给当前文档添加鼠标的键值
                var e = evt || window.event;
                var keyVal = e.keyCode;
                if (keyVal == 32) {
                    if (!gameStatus) {
                        //开始游戏
                        this.onmousemove = myPlaneMove;
                        shot();
                    } else {
                        //结束游戏
                        this.onmousemove = null;
                    }
                    gameStatus = !gameStatus;
                }

            }
        }
        // 乙方飞机的移动
    function myPlaneMove(evt) {
        var e = evt || window.event;
        var mouse_x = e.x || e.pageX;
        var mouse_y = e.y || e.pageY;

        // 计算得到鼠标移动时己方飞机左上边距
        var last_myPlane_left = mouse_x - gameML - myPlaneW / 2;
        var last_myPlane_top = mouse_y - gameMT - myPlaneH / 2;
        // 控制飞机不能脱离当前的游戏界面
        if (last_myPlane_left <= 0) {
            last_myPlane_left = 0;
        } else if (last_myPlane_left >= gameW - myPlaneW) {
            last_myPlane_left = gameW - myPlaneW;
        }
        if (last_myPlane_top <= 0) {
            last_myPlane_top = 0;
        } else if (last_myPlane_top >= gameH - myPlaneH) {
            last_myPlane_top = gameH - myPlaneH;
        }
        myPlane.style.left = last_myPlane_left + "px";
        myPlane.style.top = last_myPlane_top + "px";
    }
    //单位时间内创建子弹
    function shot() {
        a = setInterval(function() {
            //创建子弹
            creatBullet();
        }, 100);
    }
    // 制造子弹f
    function creatBullet() {
        // var bullet = new Image(bulletW, bulletH);
        var bullet = new Image();
        bullet.src = "image/bullet1.png";
        bullet.className = "b";
        // 创建子弹的位置
        // 创建每一个子弹都需要己方飞机的位置
        var myPlaneL = getStyle(myPlane, "left");
        var myPlaneT = getStyle(myPlane, "top");
        var bulletL = myPlaneL + myPlaneW / 2 - bulletW / 2;
        var bulletT = myPlaneT - bulletH;
        bullet.style.left = bulletL + "PX";
        bullet.style.top = bulletT + "PX";
        bulletsP.appendChild(bullet);
    }
}