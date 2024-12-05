import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import {
  SignIn,
  SignUp,
  UserLayout,
  Products,
  Categories,
  SubCategory,
  Brand,
  BrandCategory,
  NotFound,
  Details,
  Ads,
  Stock,
  Settings
} from '@pages'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="user-layout" element={<UserLayout />}>
          <Route index element={<Products />} />
          <Route path="products/:id" element={<Details />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<SubCategory />} />
          <Route path="brand" element={<Brand />} />
          <Route path="brand-category" element={<BrandCategory />} />
          <Route path="ads" element={<Ads />} />
          <Route path="stock" element={<Stock />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
