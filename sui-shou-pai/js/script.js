//文案信息，顺序出现
var copyDoc = {
  title: { //与html中的ID对应
    text: '#随手拍#', //内容
    speed: 0.5 //耗时，单位秒
  },
  tip: {
    text: 'SNAPSHOT',
    speed: 0.8
  },
  content: {
    text: '#随手拍#大型品牌活动，通过与微博相机与秒拍的合作，激励用户多发微博，提升微博在多媒体领域影响力。品牌方案上以淡雅蓝绿为主色调，并结合随手拍的品牌字和清新元素，呈现出清爽亮丽的效果。随手拍活动鼓励人们发现身边的美好，热爱生活，自信乐观地面对每一天。',
    speed: 6.2
  }
};


$(function() {
  $('.right-btn').click(function() {
    eventControl.nextStep();
  });

  $('.left-btn').click(function() {
    eventControl.prevStep();
  });
});

window.onload = function() {
  $('.big-bg, .right-btn').addClass('show');
};

//事件控制
var eventControl = {
  step_index: 0, //事件顺序
  nextStep: function() {
    if (this.step_index < 3) {
      this.step_index++;
    } else {
      return;
    }

    this.chooseEvent(this.step_index);
    $('.left-btn').addClass('show');
  },
  prevStep: function() {
    if (this.step_index > 0) {
      this.step_index--;
    } else {
      return;
    }

    this.chooseEvent(this.step_index);
    $('.right-btn').addClass('show');
  },
  chooseEvent: function(index) {
    this.setEnvironment(index);
    switch (index) {
      case 0:
        $('.left-btn').removeClass('show');
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        $('.right-btn').removeClass('show');
        wordEvent.run();
    }
  },
  setEnvironment: function(index) {
    switch (index) {
      case 1:
        break;
      case 2:
        wordEvent.stop();
    }
  }
};

//文字的事件
var wordEvent = {
  stop_run: false,
  run: function() {
    this.stop_run = false;
    this.animate('title', this.tipAnimate);
  },
  tipAnimate: function() {
    this.animate('tip', this.contentAnimate);
  },
  contentAnimate: function() {
    this.animate('content', function() {
      eventControl.right = false;
    });
  },
  animate: function(key, callback) {
    var text = copyDoc[key].text,
      speed = copyDoc[key].speed,
      len = text.length,
      selector = '#' + key;

    this.fillText(selector, text, speed / len * 1000, callback);
    $(selector).addClass('show');
  },
  fillText: function(selector, word, millisec, callback) {
    if (word.length == 0) {
      if (callback) {
        callback.call(this);
      }
      return;
    }

    if (this.stop_run) {
      return;
    }
    $(selector).append(word.substr(0, 1));

    var _this = this;
    setTimeout(function() {
      _this.fillText(selector, word.substr(1), millisec, callback);
    }, millisec);
  },
  stop: function() {
    this.stop_run = true;
    for (var k in copyDoc) {
      var selector = '#' + k;
      $(selector).text('').removeClass('show');
    }
  }
};