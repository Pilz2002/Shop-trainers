import { HomePage, LoginPage, RegisterPage, IntroducePage, MenPage, Cart, ViewCartPage, UserPage, PaymentPage } from "../Pages";
import { EmptyLayout } from "../Layout";

const publicRoutes = [
  { path: "/", element: HomePage },
  { path: "/login", element: LoginPage, layout: EmptyLayout },
  { path: "/register", element: RegisterPage, layout: EmptyLayout },
  { path: "/introduce", element: IntroducePage },
  { path: "/men", element: MenPage },
  { path: "/women", element: MenPage },
  { path: "/children", element: MenPage },
  { path: "/other", element: MenPage },
  { path: '/*', element: HomePage },
  
];

const privateRoutes = [
  { path: "/user/*", element: UserPage },
  { path: "/payment", element: PaymentPage },
  { path: "/cart", element: Cart },
  { path: "/view_cart", element: ViewCartPage },
];

export { publicRoutes, privateRoutes };
