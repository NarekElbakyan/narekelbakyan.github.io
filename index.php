<?php $today = getdate(); ?>
<html>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i">
        <link rel="stylesheet" href="css/style.css">

        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script type="text/javascript" src="js/calendar.js"></script>
    </head>
    <body>
    <div class="main-container">
        <div class="calendar-container">
            <div class="top calendar-full-info">
                <div class="year"><?= $today['year'];?></div>
                <div class="full-info">
                    <span class="week-day"><?= substr($today['weekday'],0,3);?>, </span><span class="mount-day"><?= substr($today['month'],0,3);?> </span><span class="day"><?= $today['mday'];?></span>
                </div>
            </div>
            <div class="calendar"></div>
        </div>
        <div class="clear"></div>
    </div>
    </body>
</html>
