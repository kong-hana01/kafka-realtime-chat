import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/chat/chat";
import Login from "./components/login/login";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:5000/apiAuthRouter')
  //     .then(res => res.json())
  //     .then(data => this.setState({title: data.title}));
  // }

  render() {return (
      <Router>
        <Routes>
          {this.state.title?<Route path="/chat" element={<Chat />} />: <Route exact path="/login" element={<Login />} />}
          
        </Routes>
      </Router>
    );
  }
};

export default App;
