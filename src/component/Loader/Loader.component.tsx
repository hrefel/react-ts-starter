import React from "react";
import './loader.css'
export default class Loader extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
