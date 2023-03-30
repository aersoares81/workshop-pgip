/**
 * reveal-header
 * A filter that adds header text and logo.
 *
 * MIT License
 * Copyright (c) 2023 Shafayet Khan Shafee.
 */

function header() {

  // add the header structure as the firstChild of div.reveal-header
  function add_header() {
    let header = document.querySelector("div.reveal-header");
    let reveal = document.querySelector(".reveal");
    reveal.insertBefore(header, reveal.firstChild);

    logo_img = document.querySelector('.header-logo img');
    if (logo_img.getAttribute('src') == null) {
      if (logo_img?.getAttribute('data-src') != null) {
        logo_img.src = logo_img?.getAttribute('data-src') || "";
        logo_img.removeAttribute('data-src');
      };
    };
  };

  // add the class inverse-header for slide with has-dark-background class
  // otherwise remove it.
  function add_class(has_dark, header_paras) {
    header_paras.forEach(el => {
      el.classList.remove('inverse-header');
      if(has_dark) {
        el.classList.add('inverse-header');
      };
    });
  };


  // dynamically changing the header
  function change_header(dheader, cheader, ctext) {
    // dhead => dynamic header
    // chead => constant header
    // ctext => contstant header_text inner html
    if (dheader !== null) {
      cheader.innerHTML = dheader.innerHTML;
    } else {
      cheader.innerHTML = ctext;
    };
  };


  if (Reveal.isReady()) {

    add_header();

    if (document.querySelector('div.reveal.has-logo') != null) {
      var slide_number = document.querySelector('div.slide-number');
      var header = document.querySelector("div.reveal-header");
      header.appendChild(slide_number);
    };

    // Get the default header text element and innner HTML (i.e. literal text)
    var header_text = document.querySelector("div.header-text p");
    const header_inner_html = header_text.innerHTML;

    var header_paras = document.querySelectorAll("div.reveal-header p");
    var dark = Reveal.getCurrentSlide().classList.contains('has-dark-background');
    add_class(dark, header_paras);

    Reveal.on( 'slidechanged', event => {
      var has_dark = event.currentSlide.classList.contains('has-dark-background');
      add_class(has_dark, header_paras);
    });

    // make the visibility of slide specific header text defined in slide body none
    document.querySelectorAll('div.header').forEach(el => {
      el.style.display = 'none';
    });


    // change the header if currently loaded slide has the header div defined
    // which won't be captured by slidechanged event unless we change slides.
    let dynamic_header = Reveal.getCurrentSlide().querySelector('div.header p');
    change_header(dynamic_header, header_text, header_inner_html);

    Reveal.on( 'slidechanged', event => {
      let dyn_header = event.currentSlide.querySelector('div.header p');
      change_header(dyn_header, header_text, header_inner_html);
    });

    /************** header text in title slide if title or                  ******/
    /*************  subtitle is used as header text                         ******/


    var title_text = document.querySelector('.reveal-header .title-text p');

    if (title_text != null) {

      title_text.style.display = 'none';

      Reveal.on( 'slidechanged' , event => {
        if (event.currentSlide.matches('#title-slide')) {
          title_text.style.display = 'none';
        } else {
          title_text.style.display = 'block';
        }
      });
    };

  };
};


window.addEventListener("load", (event) => {
  header();
});
