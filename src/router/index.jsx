import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import { SignIn, UserLayout, SignUp, Products, Categories, SubCategory } from "../pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="user-layout" element={<UserLayout />}>
          <Route index element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<SubCategory />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
