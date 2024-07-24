import Router from "./Router/Router";
import "./App.css";
import Popup from "./Components/Popup";
import Card from "./Components/Card";
import List from "./Pages/List";
import Search from "./Components/Search";


function App() {
  return (
    <>
    <Search></Search>
      <List></List>
    <Popup></Popup>

    {/* <Card></Card> */}
      <Router />
    </>
  );
}



export default App;
