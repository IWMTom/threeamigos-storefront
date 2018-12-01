import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer'
import "../css/App.scss";

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <Meta />
        <Header />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
