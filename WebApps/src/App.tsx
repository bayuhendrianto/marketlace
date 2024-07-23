import { Suspense, useEffect, useState } from "react";
import "./App.css";
import "./style/style.scss";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./page/main/dashboard/dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginPage from "./page/auth/login";
import CategoryPage from "./page/main/category/category";
import ProductPage from "./page/main/products/product";
import TransactionPage from "./page/main/transaction/transaction";
import TransactionDetailPage from "./page/main/transaction/transactionDetail";
import CategoryDetailPage from "./page/main/category/categoryDetail";
import ProductDetailPage from "./page/main/products/productDetail";
import { MainPage } from "./components/main";
import ShoppingCartPage from "./page/main/shoppingCart/shoppingCart";
import ShoppingCartDetailPage from "./page/main/shoppingCart/shoppingCartDetail";
import DefaultPage from "./components/DefaultPage";
import { useSelector } from "react-redux";
import ErrorPage from "./components/ErrorPage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const { authentication } = useSelector((state: any) => state.auth);
  const permissions = useSelector(
    (state: any) => state.auth.authentication?.role?.permissions
  ) as any[];

  return (
    <>
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
              <Route element={<MainPage />}>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                {authentication &&
                  permissions.some((e: any) => e.name === "Dashboard") && (
                    <Route path="/dashboard" element={<Dashboard />} />
                  )}
                <Route path="/product" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
                <Route
                  path="/transaction/:id"
                  element={<TransactionDetailPage />}
                />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/:id" element={<CategoryDetailPage />} />
                <Route path="/shopping-cart" element={<ShoppingCartPage />} />
                <Route
                  path="/shopping-cart/:id"
                  element={<ShoppingCartDetailPage />}
                />

                <Route path="/" element={<DefaultPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
              {/* <Route path="" element={<Navigate to="dashboard" replace />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} /> */}
            </Route>
            <Route path="*" element={<Navigate to="login" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
