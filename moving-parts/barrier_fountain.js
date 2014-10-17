GRAVITAS = 5;

/**
 * Do something over and over as quickly as can be done
 * @param thing A function you want to execute over and over again
 */
function alwaysDo(thing) {
  var last = new Date();
  function onFrameAvailable() { 
    var now = new Date();
    thing(now - last);
    last = now;
    requestAnimationFrame(onFrameAvailable);
  }
  requestAnimationFrame(onFrameAvailable);
}

function clone(element) {
  var clone = element.clone();
  clone.removeAttr("id");
  clone.addClass("barrier");
  clone.offset(element.offset());
  $("#construction").append(clone);
  return clone;
}

$(function() {
  $.fn.rotate = function(deg) {
    this.css({'transform': 'rotate('+deg+'deg)'});
    this.css({'-ms-transform': 'rotate('+deg+'deg)'});
    this.css({'-moz-transform': 'rotate('+deg+'deg)'});
    this.css({'-o-transform': 'rotate('+deg+'deg)'}); 
    this.css({'-webkit-transform': 'rotate('+deg+'deg)'});
    return this; 
  };

  $.fn.moveBy = function(x, y) {
    var offset = this.offset();
    offset.left += x;
    offset.top += y;
    this.offset(offset);
  };
});

function Particle(element) {
  var vx = Math.random() * 10,
      vy = (10 + Math.random() * 5) * -1,
      rotation = Math.random() * 180 - 90,
      rspeed = Math.random() * 3 + 3;

  if(Math.random() > 0.5) {
    vx *= -1;
  }

  function tick(delta) {
    element.rotate(rotation);
    element.moveBy(vx, vy);
    vx *= 0.99;
    vy += GRAVITAS * (delta * 0.01) ;
    rotation += rspeed;
  }

  return {
    tick: tick,
    offset: function() { return element.offset(); },
    detach: function() { element.detach(); }
  }
}

function Emitter(element, delay) {
  var particles = [],
      emissionInterval = null;

  alwaysDo(function(delta) {
    particles.forEach(function(particle) {
      particle.tick(delta);
      if(particle.offset().top > $(document).height()) {
        particles.splice(particles.indexOf(particle), 1);
        particle.detach();
      }
    });
  });

  function emit() {
    particles.push(Particle(clone(element), particles));
  }

  function pause() {
    clearInterval(emissionInterval);
  }

  function start() {
    pause();
    emissionInterval = setInterval(emit, delay);
  }

  return {
    start: start,
    pause: pause
  }
}
