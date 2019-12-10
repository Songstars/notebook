<?php
//连接数据库服务器
    $conn = mysql_connect("localhost","root","123");  
    //连接yellow数据库
    mysql_select_db("yellow","$conn");
    // 设置数据库编码格式
    mysql_query("set names utf8");


?>