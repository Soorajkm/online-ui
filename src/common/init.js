export const init = {
  isLoggedIn:
    typeof sessionStorage !== "undefined" && sessionStorage.token
      ? true
      : false,
};
