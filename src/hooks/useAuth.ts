export const useAuth = () => {
  const accessToken = localStorage.getItem("isAuth");

  const isAuth = accessToken ? true : false;

  // auth 적용 route(==page)
  const protectedRoutes = ["/main"];

  return { isAuth, protectedRoutes };
};
