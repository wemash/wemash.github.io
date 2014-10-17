SPEED = 1000;

function actualOffset(element) {
  var offset = element.offset(),
      doc = $(document);

  return {
    top: offset.top - doc.scrollTop(),
    left: offset.left - doc.scrollLeft()
  };
}

function unshift(element) {
  element
    .removeClass("shift-1")
    .removeClass("shift-2")
    .removeClass("shift-3");
}

$(function() {
  if(SETTINGS.QUICKLOOK) {
    $(".tile").click(function(e) {

      e.stopPropagation();
      e.preventDefault();

      var me = $(this),
          clone = me.clone(),
          offset = actualOffset(me);

      me.css({opacity: 0});
      unshift(clone);
      clone
        .css({
          position: "fixed",
          top: offset.top,
          left: offset.left})
        .animate({top: 0}, SPEED * (offset.top / SPEED))
        .animate({left: 0}, SPEED * (offset.left / SPEED));
      
      $("body")
        .addClass("dim")
        .append(clone);

      return false;
    });
  }
});
