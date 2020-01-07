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
    var b = null; //敌机的变量
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
                        appearEnemy();
                    } else {
                        //结束游戏
                        this.onmousemove = null;
                    }
                    gameStatus = !gameStatus;
                }

            }
        }
        // 自己方飞机的移动
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
        if (a) return; //如果a存在 不再创建a
        a = setInterval(function() {
            //创建子弹
            creatBullet();
        }, 100);
    }
    // 制造子弹
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
        move(bullet, "top");
    }

    // 子弹的运动:运动函数(迅速运动)
    function move(ele, attr) {
        var speed = -8;
        ele.timer = setInterval(function() {
            var moveval = getStyle(ele, attr);
            // 子弹的top值是负数 删除子弹  清除定时器
            if (moveval <= -bulletH) {
                clearInterval(ele.timer);
                ele.parentNode.removeChild(ele);
            } else {
                ele.style[attr] = moveval + speed + "px";
            }
        }, 10);

    }


    //创建敌机数据对象
    var enemyObj = {
        enemy1: {
            width: 34,
            height: 24,
            score: 100,
            hp: 100
        },
        enemy2: {
            width: 46,
            height: 60,
            score: 500,
            hp: 500
        },
        enemy3: {
            width: 110,
            height: 164,
            score: 1000,
            hp: 1000
        }
    }

    // 创建敌机的定时器
    function appearEnemy() {
        if (b) return;
        b = setInterval(function() {
            creatEnemy();
        }, 1000);
    }


    // 制造敌机的函数
    function creatEnemy() {
        // 敌机出现概率的数据
        var percentData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3];
        // 敌机的类型
        var enemyType = percentData[Math.floor(Math.random() * percentData.length)];
        // 得到当前随机敌机的数据
        var enemyData = enemyObj["enemy" + enemyType];
        // 创建敌机所在的元素
        var enemy = new Image(enemyData.width, enemyData.height);
        enemy.t = enemyType;
        enemy.src = "image/enemy" + enemyType + ".png";
        enemy.score = enemyData.hp;
        // 确定当前敌机出现的位置
        var enemyL = Math.floor(Math.random() * (gameW - enemyData.width + 1));
        var enemyT = -enemyData.height;
        enemy.className = "en";
        enemy.style.left = enemyL + "px";
        enemy.style.top = enemyT + "px";
        enemysP.appendChild(enemy);
        enemyMove(enemy, "top");
    }


    //敌机的运动
    function enemyMove(ele, attr) {
        var speed;
        if (ele.t === 1) {
            speed = 1.5;
        } else if (ele.t === 3) {
            speed = 1;
        } else {
            speed = 0.5;
        }

        ele.timer = setInterval(function() {
            var moveVal = getStyle(ele, attr);
            if (moveVal >= gameH) {
                clearInterval(ele.timer);
            } else {
                ele.style[attr] = moveVal + speed + "px";
            }
        }, 10);
    }
}