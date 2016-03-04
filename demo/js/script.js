var halfPoint = 10,
  pointIndex = 1;

function Point(x, y) {
  var point = document.createElement('div');
  point.index = pointIndex++;

  $(point).addClass('point').
  css({
    left: x,
    top: y
  }).
  html(point.index).
  mousedown(function(e) {

    var _this = $(this),
      wrap = $('.wrap'),
      wrapX = wrap.offset().left + halfPoint,
      wrapY = wrap.offset().top + halfPoint;

    wrap.mousemove(function(e) {
      var mouseX = e.pageX,
        mouseY = e.pageY;

      _this.css({
        left: mouseX - wrapX,
        top: mouseY - wrapY
      });
    }).mouseup(function() {
      $(this).off('mousemove');
      linePoint();
      printPoint();
    });

    return false;
  });

  this.point = point;
}

function linePoint() {
  var points = $('.point');

  if (points.length % 2 == 0) {

    var myCanvas = document.getElementById("canvas"),
      context = myCanvas.getContext("2d");

    context.clearRect(0, 0, $(myCanvas).width(), $(myCanvas).height());

    points.each(function(i) {

      if (i % 2 == 0) {

        var startX = $(this).position().left + halfPoint,
          startY = $(this).position().top + halfPoint,
          endX = points.eq(i + 1).position().left + halfPoint,
          endY = points.eq(i + 1).position().top + halfPoint;

        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
      }
    });
  }
}

function printPoint() {
  var points = $('.point'),
    html = '';

  if (points.length % 2 === 0) {

    points.each(function(i) {

      if (i % 2 == 0) {
        var nextPoint = points.eq(i + 1),
          pointIndex = this.index;

        html +=
          '<li>' +
          pointIndex + ':(' + $(this).position().left + ',' + $(this).position().top + ')到(' + nextPoint.position().left + ',' + nextPoint.position().top + ')' +
          '</li>' +
          '<li>' +
          (pointIndex + 1) + ':(' + nextPoint.position().left + ',' + nextPoint.position().top + ')到(' + $(this).position().left + ',' + $(this).position().top + ')' +
          '</li>';
      }
    });
    $('.result-out').html(html);
  }
}

$(function() {
  var w = $('img').width(),
    h = $('img').height();
  $('canvas').width(w).height(h).
  attr({
    width: w,
    height: h
  });

  $('.wrap').mousedown(function(e) {

    if (e.button == 2) {
      return;
    }

    var pointWidth = 20,
      x = e.offsetX - halfPoint,
      y = e.offsetY - halfPoint,
      point = new Point(x, y).point;

    $(this).append(point);

    linePoint();
    printPoint();
  });

  $('.back').mousedown(function() {
    var points = $('.point');

    if (points.length == 0) {
      return false;
    }

    points.eq(points.length - 1).remove();
    pointIndex--;
    linePoint();
    printPoint();
    return false;
  });

  $('.result').mousedown(function() {
    getResult();
    return false;
  });
});

function getResult() {
  var points = $('.point'),
    result = [];

  points.each(function(i) {

    if (i % 2 == 0) {

      var nextPoint = points.eq(i + 1);

      result.push({
        "number": this.index,
        "start": $(this).position().left + ',' + $(this).position().top,
        "end": nextPoint.position().left + ',' + nextPoint.position().top
      });

      result.push({
        "number": this.index+1,
        "start": nextPoint.position().left + ',' + nextPoint.position().top,
        "end": $(this).position().left + ',' + $(this).position().top
      });
    }
  });

  $('.json').html(JSON.stringify(result));
}
