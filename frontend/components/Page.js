import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import Footer from "./Footer";
import Cart from "./Cart";
import "../css/App.scss";

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <Meta />
        <Cart />
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
