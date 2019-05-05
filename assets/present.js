let page_selector = document.getElementById('current_page');
let slides = document.querySelectorAll('section')
let slidechannel = new BroadcastChannel('slidenum');

function total_pages () {
  document.getElementById('total_pages').textContent = slides.length;
  for (let [index, slide] of slides.entries()) {
    let opt = document.createElement('option');
    opt.value = index + 1;
    opt.text = index + 1;
    page_selector.add(opt, null);
  }
}

function change_slide(slidenum) {
  let hashpath = window.location.hash.split('/');
  hashpath[0] = '#' + slidenum;
  window.location.hash = hashpath.join('/');
  if (hashpath[1] == 'remote') {
    slidechannel.postMessage(slidenum);
  }
}

function get_slidenum() {
  let urlnum = parseInt(window.location.hash.slice(1));
  let slidenum = urlnum || 1;
  if (slidenum < 1) {
    slidenum = 1;
  } else if (slides.length < slidenum) {
    slidenum = slides.length;
  }
  if (urlnum !== slidenum) {
    change_slide(slidenum);
  }
  return slidenum;
}

function parse_hash(){
  //let current_slide = document.querySelector('section.active');
  //let Array.from(slides).indexOf(current_slide)
  let slidenum = get_slidenum();
  let slideindex = slidenum - 1;
  for (let [index, slide] of slides.entries()) {
    if (index == slideindex) {
      slide.className = 'active';
    } else {
      slide.className = '';
    }
  }
  page_selector.value = '' + slidenum;
}

function advance(e) {
  let slidenum = get_slidenum();
  if (e) {
    e.preventDefault();
  }
  change_slide(slidenum + 1);
  return false;
}

function previous(e) {
  let slidenum = get_slidenum();
  if (e) {
    e.preventDefault();
  }
  change_slide(slidenum - 1);
  return false;
}

total_pages();
parse_hash();

window.addEventListener('hashchange', parse_hash);
page_selector.addEventListener('change', function() {
  change_slide(page_selector.value);
});

document.getElementById('previous').addEventListener('click', previous);
document.getElementById('next').addEventListener('click', advance);

window.addEventListener('keydown', e => {
  if (['n', 'ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
    advance();
  } else if (['p', 'ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) {
    previous();
  } else if (e.key == 'Home') {
    change_slide(1);
  } else if (e.key == 'End') {
    change_slide(slides.length);
  } else {
    console.log(e.key);
  }
});

slidechannel.addEventListener('message', e => {
  change_slide(e.data);
});
