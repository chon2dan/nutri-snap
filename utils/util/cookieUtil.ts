const getLocaleFromCookie = () => {
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
  return match?.[1] || "ko";
};

export default getLocaleFromCookie;
