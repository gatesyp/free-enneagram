export function scrollToTop() {
  if (typeof window === "undefined") return;

  const scroll = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  scroll();
  requestAnimationFrame(scroll);
  setTimeout(scroll, 0);
}