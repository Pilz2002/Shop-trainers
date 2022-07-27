import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layout";
import { publicRoutes } from "./routes";


function App() {
  
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
