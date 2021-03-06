$(function() {
  var ref = new Firebase('https://poofytoo.firebaseio.com/infoloungelet');
  var lastColor = '';

  // Force Reset Page
  ref.child('refresh').on('value', function(s) {
    console.log(s.val());
    if (s.val() == 1) {
      ref.child('refresh').set(0);
      location.reload();
    }
  })

  var action = function() {
    currentTime();
    slideOverlay();
  }

  var randomColor = function() {
    var colors = ['green', 'purple', 'blue', 'pink', 'white', 'orange', 'orange', 'blue'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    while (color == lastColor) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    lastColor = color;
    return color;
  }

  var randomGreeting = function() {
    var greetings = ['HELLO!', 'HI!'];
    var r = Math.random();
    if (r < 0.4) {
      return currentTime();
    } else if (r < 0.8) {
      return currentDate();
    } else {
      return 'HELLO!';
    }
  }

  var currentTime = function() {
    var d = new Date();
    var m = '';
    var n = '';
    if (d.getHours() < 10) {
      m = '0';
    }
    if (d.getMinutes() < 10) {
      n = '0';
    }
    return m + d.getHours() + '<span class="colon-shift">:</span>' + n + d.getMinutes();
  }

  var currentDate = function() {
    var m_names = new Array("JAN", "FEB", "MAR", 
    "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", 
    "OCT", "NOV", "DEC");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    return m_names[curr_month] + ' ' + curr_date
  }

  var slideOverlay = function() {
    var dir = Math.random() > 0.5 ? 'HOR' : 'VER';
    var fValue = dir == 'VER' ? $(document).height() : $(document).width();

    $('.a1').clone()
      .addClass('c1')
      .removeClass('a1')
      .addClass(randomColor())
      .css('f', 0)
      .css('clip', 'rect(0px, auto, auto, auto)')
      .appendTo('body')
      .show();

    $('.c1').find('h1').html(randomGreeting());
    $('.c1').animate({f: fValue},
    {
      step: function(now, fx) {
        if (dir == 'VER') {
          $(this).css('clip', 'rect(0px, auto, '+(now)+'px, 0px)')
        } else {
          $(this).css('clip', 'rect(0px, auto, auto, '+(fValue - now)+'px)')
        }
      },
      easing: 'easeInCubic',
      duration: 1000,
      complete: function() {
        $('.b1').remove();
        $(this)
          .removeClass('c1')
          .addClass('b1');
      }
    });

  }

  var INTERVAL = 2000;

  action();
  var timer = window.setInterval(action, INTERVAL);
});