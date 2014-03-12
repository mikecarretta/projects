// utility object
var u = {
  z: function(id) {
    'use strict';
    if (typeof id == 'string') {
      return document.getElementById(id);
    }
  },
  // function for add event listerers
  ae: function(obj, type, fn) {
    'use strict';
    if (obj && obj.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else if (obj && obj.attachEvent) {
      obj.attachEvent('on' + type, fn);
    }
  }
} // end u

var w = {
  count: function() {
    'use strict';
    var input = u.z('word-box').value.length;
    var message = u.z('count').innerHTML = '';
    message += u.z('count').innerHTML += input;
  },
  clear: function() {
    'use strict';
    u.z('word-box').value = '';
    w.count();
  },
  sortText: function() {
    'use strict';
    var input = u.z('word-box').value;

    if (input.length === 0) {
      u.z('word-box').value = "Please add a few words to sort";

    } else {
      // convert the string to an array
      // var words = u.z('word-box').value;
      // regex replace multiple spaces and punctuation
      input = input.replace(/\s{2,}|\.|\,|\?|\!|\#/g, '');
      input = input.split(' ');


      var sorted = input.map(function(value) {
        return value.toLowerCase();
      }).sort();

      return u.z('word-box').value = sorted.join(' ');
    }
    w.count();
  },
  rand: function() {
    var zombieWords = ['Zombie', 'brains', 'flesh', 'guts', 'Undead', 'walking dead', 'virus', 'living dead', 'decay'];
    // http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    /*
    Array.prototype.randomEl = function () {
      return this[Math.floor(Math.random() * this.length)]
    }
    var ranWord = zombieWords.randomEl();
    console.log(ranWord);
    */
  },
  wordArray: function() {
    'use strict';
    var wordsArray = [];

    var input = u.z('word-box').value.replace(/\s{2,}|\.|\,|\?|\!|\#/g, '').split(' ');

    wordsArray.push(input);

    var text = '';
    for (var i = 0, count = wordsArray.length; i < count; i++) {
        text += wordsArray[i].join(' ');
    }
    u.z('word-box').value = text;

    console.log(text);
    console.log(wordsArray);
  }
}

window.onload = function() {
  'use strict';
  w.count();
  u.ae(u.z('word-box'), 'keyup', w.count);
  u.ae(u.z('clear-btn'), 'click', w.clear);
  u.ae(u.z('sort-btn'), 'click', w.sortText);
  u.ae(u.z('array-btn'), 'click', w.wordArray);
  w.rand();
}



