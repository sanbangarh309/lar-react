import React, { Component } from 'react';
import './cssarea.css';
class CssArea extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }
render() {
  console.log(this.props.contentCss);
      return (
        <div
          id="cssArea"
          className="css-area fancy" >
           <table style={{width:"100%"}}>
          <tr>
            <th>Width</th>
            <th>Height</th>
            <th>Top</th>
            <th>Left</th>
          </tr>
          <tr>
            <td>{this.props.contentCss ? this.props.contentCss.w : '190'}</td>
            <td>{this.props.contentCss ? this.props.contentCss.h : '200'}</td>
            <td>{this.props.contentCss?this.props.contentCss.t:''}</td>
            <td>{this.props.contentCss?this.props.contentCss.l:''}</td>
          </tr>
        </table> 
        </div>
      );
    }
  };
export default CssArea;
  