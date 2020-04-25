window.onscroll = () => {
  const header = document.querySelector('header');
  if (header) {
    const info = header.querySelector('.navbar');

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      header.classList.add('scrolling');
    } else {
      header.classList.remove('scrolling');
    }
  }
}