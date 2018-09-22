var toggleVisible = function(item) {
  if (item.style.display === 'none') {
    item.style.display = 'block';
  } else {
    item.style.display = 'none';
  }
};


window.addEventListener("load", function(event) {
  document.getElementById("topmenu_trigger").addEventListener("click", function(event) {
    toggleVisible(document.getElementById("topmenu"));
  });
});
