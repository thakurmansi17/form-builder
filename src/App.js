import "./App.css";
import Formbuilder from "./components/Formbuilder";
import Form from "./components/Form";
import FormDetails from "./components/FormDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Formbuilder}></Route>
          <Route exact path="/addForm/:fn" component={Form}></Route>
          <Route exact path="/form/:formname" component={FormDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
