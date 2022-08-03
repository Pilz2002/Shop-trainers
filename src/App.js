import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layout";
import { publicRoutes, privateRoutes } from "./routes";
import { Alert, Protected } from "@/components"
import { useSelector } from "react-redux"
import { selectIsShowAlert, selectAlertInfo } from "@/app/rootReducer"


function App() {
  const isShowAlert = useSelector(selectIsShowAlert)
  const alertInfo = useSelector(selectAlertInfo)
  return (
    <Router>
      {isShowAlert && <Alert message={alertInfo.message} type={alertInfo.type} />}
      <Routes>
        {publicRoutes.map((route, index) => {
          const { path, layoutProp } = route;
          let Layout = MainLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.element;
          return (
            <Route
              path={path}
              key={index}
              element={
                <Layout sidebarItems={layoutProp}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        <Route element={<Protected />}>
        {privateRoutes.map((route, index) => {
          const { path, layoutProp } = route;
          let Layout = MainLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.element;
          return (
            <Route
              path={path}
              key={index}
              element={
                <Layout sidebarItems={layoutProp}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
