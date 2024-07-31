const setCookie = (cookieName, cookieValue, expirationDays) => {
  if (typeof document !== 'undefined') {
    const d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie =
      cookieName + '=' + cookieValue + ';' + expires + ';path=/';
  }
  return null;
};

export default setCookie;
