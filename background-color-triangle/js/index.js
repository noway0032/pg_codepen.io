function getQuote() {
  $("#quote").animate({opacity: 0}, 100, function(){
    $(this).animate({opacity: 1}, 2000);
  });
  $("#quote-author").animate({opacity: 0}, 100, function(){
    $(this).animate({opacity: 1}, 2000);
  });
}
var currentColour;
function updateBg(changeCol){
  var colours = ["YlGn","Purples", "OrRd", "YlGnBu", "GnBu", "Oranges", "BuGn","PuBuGn", "PuBu", "Blues", "PiYG", "PuOr", "YlOrRd", "Greens", "RdBu", "YlOrBr", "PuRd"];
  var textCol = ["#00AF56", "#AD4FE1", "#F86B4D", "#32A087", "#35AA78", "#F58F00", "#00A36E", "#027399", "#533FE6", "#204C85", "#9D1B70", "#D54141", "#E97B00", "#24B42D", "#6C3A70", "#AC4702", "#C11A55"];
  if (changeCol == "true"){
    var changedCol = Math.floor(Math.random() * colours.length);
    currentColour = changedCol;
  } else {
    var changedCol = currentColour;
  }
  var pattern = Trianglify({
    height: document.documentElement.clientHeight,
    width: window.innerWidth,
    x_colors: colours[changedCol],
    cell_size: 80
  });
  if($("canvas").length){
    document.body.appendChild(pattern.canvas(document.querySelector("canvas")));
  } else {
    document.body.appendChild(pattern.canvas());
  }
  $("body").animate({color: textCol[changedCol]}, 500);
  $(".button").animate({'background-color': textCol[changedCol]}, 500);
}
$(document).ready(function() {
  updateBg("true");  
  getQuote();
  $("#get-quote").on("click", getQuote);
  $("#get-quote").on("click", function(e){
    updateBg("true");
  });
  $(window).resize(function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function() {
      updateBg();
    }, 50);
  });
});