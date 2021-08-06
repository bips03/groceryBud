import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Additem from "./components/Additem";
import Navbar from "./components/Navbar";
import Items from "./components/Items";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Update from './components/Update';
import { ItemsContextProvider } from "./ItemsContext";
import { Card, Container } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <ItemsContextProvider>
      <Router>
        <Container
          className="d-flex align-items-center justify-content-center text-center"
          style={{ minHeight: "100vh" }}
        >
          <Card className = 'w-100 my-2' style={{ maxWidth: "600px" }} >
            <Card.Body className="w-100">
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Navbar} />
              <PrivateRoute exact path="/" component={Additem} />
              <PrivateRoute exact path="/" component={Items} />
              <PrivateRoute exact path="/" component={Footer} />
              <PrivateRoute path = '/update' component = {Update} />
              <Route path='/reset' componenet = {Reset} /> 
            </Card.Body>
          </Card>
        </Container>
      </Router>
    </ItemsContextProvider>
  );
}

export default App;
