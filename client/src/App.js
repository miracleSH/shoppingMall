import { Routes, Route } from "react-router-dom";
import Footer from "./components/views/Footer/Footer";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Navbar from "./components/views/Navbar/Navbar";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers/index";
import Auth from "./hoc/auth";

function App() {
  const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
  const LandingComponent = Auth(LandingPage, true);
  const LoginComponent = Auth(LoginPage, false);
  const RegisterComponent = Auth(RegisterPage, false);
  const UploadProductComponent = Auth(UploadProductPage, true);
  return (
    <div>
      <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/product/upload" element={<UploadProductComponent />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
