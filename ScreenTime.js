((global) => {

  let Watcher = function() {
    return new Watcher.init();
  }

  Watcher.prototype = (function() {
    
    let inView = function(item) {
      let top = item.getBoundingClientRect().top;
      let bot = item.getBoundingClientRect().bottom;

      let visible = (top < window.innerHeight) && (bot >= 0);
      return visible;
    }

    let update = function() {
      if (this.started) {
        // every 10 ms run the update counter on the items in the array
        setTimeout(run.bind(this), 10);        
      }
    }

    let run = function() {
      // CHECK ITEMS HERE
      for (i = 0; i < this.divs.length; i++ ) {
        elem = this.divs[i];
        let inFrame = inView(elem);
        if (inFrame) {
          let old = this.store[elem.id];
          this.store[elem.id] = old + 10; // mili
        }
      }
      update.bind(this)();
    }

    return {

      add: function(item) {
        this.divs.push(item); // this is an array of div ids we are watching
        this.store[item.id] = 0; // this is the time its on screen
      },

      start: function() {
        if (this.divs.length) {
          this.started = true;
          run.bind(this)();
        } else {
          throw 'you must add divs to watch';
        }
      },

      stop: function() {
        this.started = false;
      }
    };

  })();

  Watcher.init = function() {
    this.started = false;
    this.divs = []; // this is a list of watched divs
    this.store = {}; // this is storing each div and TOS create objects with div name and time fields
  }

  Watcher.init.prototype = Watcher.prototype;

  global.ScreenTime = Watcher;

})(window);