
$(function () {



// these are labels for the days of the week
    cal_days_labels = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ,'Sun'];

// these are human-readable month name labels, in order
    cal_months_labels = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

// these are the days of the week for each month, in order
    cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
    cal_current_date = new Date();

    function Calendar(month, year) {
        this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
        this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
        this.html = '';
    }

    Calendar.prototype.generateHTML = function(shift) {

        shift = (shift || 0) % 7;

        // get first day of month
        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = firstDay.getDay()-1;


        var fullDate = new Date();
        var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;


        var twoDigitMonth = fullDate.getMonth();

        if (shift > startingDay) {
            shift -= 7;
        }
        var monthName = cal_months_labels[this.month];

        // find number of days in month

        var monthLength = cal_days_in_month[this.month];

        var monthNameindex = cal_months_labels.indexOf(monthName)+1+""; // 1

        if(monthNameindex.length==1){
            monthNameindex="0" + monthNameindex;
        }


        // compensate for leap year
        if (this.month == 1) { // February only!
            if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
                monthLength = 29;
            }
        }


        // do the header
        var pageClass = '.main-container';


        var html = '<div class="calendar-table">';

        html += '<div class="top-box"><div class="icon" data-nav="left" data-month="'+ (twoDigitMonth-1) +'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.74 17.41"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;opacity:0.54;}</style></defs><title>left</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="10.74 2.03 8.71 0 0 8.71 8.71 17.41 10.74 15.38 4.06 8.71 10.74 2.03"/></g></g></svg></div><span colspan="7">';
        html += monthName + "&nbsp;" + this.year;
        html += '</span><div class="icon" data-nav="right" data-month="'+ (twoDigitMonth+1) +'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.74 17.41"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;opacity:0.54;}</style></defs><title>right</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="0 15.38 2.03 17.41 10.74 8.71 2.03 0 0 2.03 6.68 8.71 0 15.38"/></g></g></svg></div></div>';
        html += '<ul class="calendar-header">';

        for (var i = 0; i <= 6; i++) {
            html += '<li class="calendar-header-day">';
            html += cal_days_labels[(i + shift + 7) % 7].charAt(0);
            html += '</li>';
        }
        html += '<div class="clear"></div></ul><ul class="day-row">';

        // fill in the days
        var day = 1;

        var day_o = 1;
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            for (var j = 0; j <= 6; j++) {
                if(day_o.toString().length==1)	day_o="0" +day_o;
                if(twoDigitDate == day && monthName == cal_months_labels[fullDate.getMonth()]){
                    html += '<li class="calendar-day current-day active"  data-fullDate="' + this.year + '-' + monthNameindex + '-' +day_o + '" data-day="'+ day +'" data-month="'+ monthName +'" data-year="'+ this.year +'" data-week="' + cal_days_labels[(j + shift + 7) % 7] + '">';
                }else {
                    html += '<li class="calendar-day" data-fullDate="' + this.year + '-' + monthNameindex + '-' + day_o + '" data-day="'+ day +'" data-month="'+ monthName +'" data-year="'+ this.year +'" data-week="' + cal_days_labels[(j + shift + 7) % 7] + '">';
                }
                if (day <= monthLength && (i > 0 || j + shift >= startingDay)) {

                    html += '<span>'+ day +'</span>';
                    day++;
                    day_o++;
                }
                html += '</li>';
            }
            // stop making rows if we've run out of days
            if (day > monthLength || day_o > monthLength) {
                break;
            } else {
                html += '<div class="clear"></div></ul><ul class="day-row">';
            }
        }
        html += '<div class="clear"></div></ul></div>';

        this.html = html;
    }

    Calendar.prototype.getHTML = function() {
        return this.html;
    }

    var fullDate = new Date();
    var twoDigitMonth = fullDate.getMonth();

    var cal = new Calendar(twoDigitMonth,fullDate.getFullYear());

    cal.generateHTML();

    var year = fullDate.getFullYear();
    $('.calendar-container  .calendar').html(cal.getHTML());

    $(document).on('click' , '.calendar-container .top-box .icon' , function () {
        var direction = $(this).data('nav');

        if(direction == 'right') {
            console.log('right');

            var Month = $(this).data('month');
            var Month = parseInt(Month);
            var PrevMonth = $('.calendar-container .top-box .icon[data-nav="left"]').data('month');
            var PrevMonth = parseInt(PrevMonth);

            if(Month == 12) {
                Month = 0;
                PrevMonth = 10;

                year+=1;
                var cal = new Calendar(Month,year);
                cal.generateHTML();
                $('.calendar-container .calendar').html(cal.getHTML());

                $('.calendar-container .top-box .icon[data-nav=right]').attr('data-month' ,Month+1);
                $('.calendar-container .top-box .icon[data-nav=left]').attr('data-month' ,PrevMonth+1);
            }else {
                if(PrevMonth == 11){
                    PrevMonth = -1;
                }
                var cal = new Calendar(Month,year);
                cal.generateHTML();

                $('.calendar-container .calendar').html(cal.getHTML());

                $('.calendar-container .top-box .icon[data-nav=right]').attr('data-month' ,Month+1);
                $('.calendar-container .top-box .icon[data-nav=left]').attr('data-month' ,PrevMonth+1);
            }

        } else if (direction == 'left') {

            var Month = $(this).data('month');
            var Month = parseInt(Month);
            var NextMonth = $('.calendar-container .top-box .icon[data-nav="right"]').data('month');
            var NextMonth = parseInt(NextMonth);
            var cal = new Calendar(Month,fullDate.getFullYear());

            cal.generateHTML(0);
            if(Month == -1) {
                Month = 11;
                NextMonth = 0;

                year-=1;
                var cal = new Calendar(Month,year);
                cal.generateHTML(0);
                $('.calendar-container  .calendar').html(cal.getHTML());

                $('.calendar-container .top-box .icon[data-nav=left]').attr('data-month' ,Month-1);
                $('.calendar-container  .top-box .icon[data-nav=right]').attr('data-month' ,NextMonth);
            }else {
                if(NextMonth == 0){
                    NextMonth = 12;
                }
                if(NextMonth == 1 && Month == 11){
                    year+=1;
                }
                var cal = new Calendar(Month,year);

                cal.generateHTML(0);
                $('.calendar-container .calendar').html(cal.getHTML());

                $('.calendar-container .top-box .icon[data-nav=left]').attr('data-month' ,Month-1);
                $('.calendar-container .top-box .icon[data-nav=right]').attr('data-month' ,NextMonth-1);
            }
        }

    });

    $(document).on('click' , ' .calendar ul.day-row li' , function () {
        if($(this).find('span').length == 1) {
            $('.calendar-container ul.day-row li').removeClass('active');
            $(this).addClass('active');

            var ClickedDay = $(this).data('day');
            var ClickedDayMonth = $(this).data('month').substr(0, 3);
            var ClickedDayWeek = $(this).data('week');
            var ClickedDayYear = $(this).data('year');

            $('.calendar-container .calendar-full-info .year').text(ClickedDayYear);
            $('.calendar-container .calendar-full-info .week-day').text(ClickedDayWeek + ', ');
            $('.calendar-container .calendar-full-info .mount-day').text(ClickedDayMonth + ' ');
            $('.calendar-container .calendar-full-info .day').text(ClickedDay);
        }
    });

});

$(document).ready(function () {
    var globalColor = $('.calendar-container .calendar').data('textcolor');
    $('.calendar-container .calendar').css('color' , globalColor);


    var themeColor = $('.calendar-container ').data('themecolor');
    $('.calendar-container .top').css('background-color' , themeColor);


    var topBoxTextColor = $('.calendar-container .top ').data('boxtextcolor');
    $('.calendar-container .top').css('color' , topBoxTextColor);
});


