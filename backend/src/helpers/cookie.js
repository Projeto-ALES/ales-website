exports.parseCookie = async cookie => {
  const rawCookies = cookie.split(";");
  const parsedCookies = {};

  await rawCookies.forEach(rawCookie => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0].trim()] = parsedCookie[1];
  });

  return parsedCookies;
};

exports.clearCookies = res => {
  res.clearCookie("token");
  res.clearCookie("refresh_token");
  return res;
};
