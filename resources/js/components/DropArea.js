import React, { Component } from 'react';
import './Droparea.css';
class DropArea extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
      list: [ 
        { id: 1, isDragging: false, isResizing: false, top:74, left: 50,   width:190, height:200 }, 
        { id: 2, isDragging: false, isResizing: false, top:315, left: 294,   width:190, height:200 },
        { id: 3, isDragging: false, isResizing: false, top:315, left: 50,   width:190, height:200 },
        { id: 4, isDragging: false, isResizing: false, top:74, left: 294,   width:190, height:200 }, 
      ],
    };
    }

    onDragOver(e) {
      console.log("DropArea.onDragOver");
      e.preventDefault();
      return false;
    }
    onDrop(e) {
        console.log("DropArea.onDrop");
        let list = this.state.list;
        var obj = JSON.parse(e.dataTransfer.getData('application/json'));
        let index = this.state.list.findIndex((item) => item.id == obj.id);
        list[index].isDragging = false;
        list[index].top  = (e.clientY - obj.y);
        list[index].left = (e.clientX - obj.x);
        this.props.contentCss({t:list[index].top,l:list[index].left,w:list[index].width,h:list[index].height});
        let newState = Object.assign(
          this.state, {
            list : list
          });
        this.setState(newState);
        e.preventDefault();
    }
    updateStateDragging( id, isDragging){
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].isDragging = isDragging;
      console.log(list[index]);
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    updateStateResizing( id, isResizing){
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].isResizing = isResizing;
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }

    funcResizing(id, clientX, clientY){
      // let node = ReactDOM.findDOMNode(this.refs["node_" + id]);
      let node = this.refs["node_" + id];
      let position = node.refs.node.getBoundingClientRect();
      // console.log(node);
      // console.log(position);
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].width =   clientX - position.left + (16 / 2);
      list[index].height =  clientY - position.top  + (16 / 2);
      this.props.contentCss({t:list[index].top,l:list[index].left,w: parseInt(list[index].width),h:parseInt(list[index].height)});
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }

    // funcResizing(id, clientX, clientY, field='',docId=''){
    //   if(this.props.doc_for_sign){
    //     return; 
    //   }
    //   if(docId){
    //     this.state.doc_key = docId;
    //   }
    //   let element = this.refs[field + '_' + this.state.doc_key + '_' + id];
    //   let list = this.state.items;
    //   let position = element.refs.node.getBoundingClientRect();
    //   let parentWidth = element.refs.node.parentElement.style.width; console.log(parentWidth);
    //   let currentLeft = element.refs.node.style.left;
    //   let w = clientX - position.left + (16 / 2);
    //   let h = clientY - position.top  + (16 / 2);
    //   if ((parseFloat(currentLeft) + w) < parseFloat(parentWidth)) {
    //     list[id].width = w;
    //     list[id].height = h;
    //     list[id].fontSize = parseFloat(list[id].height / 2.5);
    //     let newState = Object.assign(
    //       this.state, {
    //         items: list
    //       });
    //     this.setState(newState); 
    //   }else{
    //     // list[id].isResizing = 'false';
    //     // let newState = Object.assign(
    //     //   this.state, {
    //     //     items: list
    //     //   });
    //     // this.setState(newState);
    //   }
    // }
render() {
    let items = [];
    for (let item of this.state.list) {
      items.push(
        <Draggable 
          ref={"node_" + item.id}
          key={item.id}
          id={item.id}
          top={item.top}
          left={item.left}
          width={item.width}
          height={item.height}
          isDragging={item.isDragging}
          isResizing={item.isResizing}
          updateStateDragging={this.updateStateDragging.bind(this)}
          updateStateResizing={this.updateStateResizing.bind(this)}
          funcResizing={this.funcResizing.bind(this)}
          contentType={this.props.contentType}
        />
      );
    }
      return (
        <div
          id="parentArea"
          className="drop-area"
          onDragOver={this.onDragOver.bind(this)}
          onDrop={this.onDrop.bind(this)} >
          {items}
        </div>
      );
    }
  };
  class Draggable extends React.Component {
    constructor(props) {
      super(props);
    }
    onMouseDown(e){
      console.log("Draggable.onMouseDown");
      var elm = document.elementFromPoint(e.clientX, e.clientY);
      if( elm.className != 'resizer' ){
        this.props.updateStateDragging( this.props.id, true );
      }
    }
    onMouseUp(e){
      console.log("Draggable.onMouseUp");
      this.props.updateStateDragging( this.props.id, false );
    }
    onDragStart(e) {
      console.log("Draggable.onDragStart");
      const nodeStyle = this.refs.node.style;
      e.dataTransfer.setData( 'application/json', JSON.stringify({
        id: this.props.id,
        // mouse position in a draggable element
        x: e.clientX - parseInt(nodeStyle.left),
        y: e.clientY - parseInt(nodeStyle.top),
      }));
    }
    onDragEnd(e){
      console.log("Draggable.onDragEnd");
      this.props.updateStateDragging( this.props.id, false );
    }
    render() {
      const { contentType } = this.props;
      const styles = {
        top:    this.props.top,
        left:   this.props.left,
        width:  this.props.width,
        height: this.props.height,
      };
      const readmeStyle = {};
      const imageStyle = {};
      const documentStyle = {};
      // const readmeStyle = {};
      // const readmeStyle = {};
      if (contentType == '/readme.md') {
        readmeStyle['border'] = '2px solid blue';
      }
      if (contentType == '/image') {
        imageStyle['border'] = '2px solid red';
      }
      if (contentType == '/documents') {
        documentStyle['border'] = '2px solid black';
      }

      return (
        <div
          ref={"node"}
          draggable={this.props.isDragging}
          id={ 'item_' + this.props.id }
          className="item unselectable"
          style={styles}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onDragStart={this.onDragStart.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}>
            { 'item_' + this.props.id }
          <header style={readmeStyle}>
            <code>&#60;Readme&#62;</code>
          </header>

          <section style={documentStyle}>
            <code>&#60;Documents&#62; <br/> float: left;</code>
          </section>

          <section style={imageStyle}>
            <code>&#60;Image&#62; <br/> float: left;</code>
          </section>

          <section>
            <code>&#60;section&#62; <br/> float: left;</code>
          </section>

          <footer>
            <code>&#60;footer&#62;</code>
          </footer>
          <Resizer
            ref={"resizerNode"}
            id={this.props.id}
            isResizing={this.props.isResizing}
            resizerWidth={16}
            resizerHeight={16}
            updateStateResizing={this.props.updateStateResizing}
            funcResizing={this.props.funcResizing} />
        </div>
      );
    }
  };

// Resizer Component
class Resizer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const x = document.getElementById("parentArea");
    x.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    x.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  componentWillUnmount(){
    const x = document.getElementById("parentArea");
    x.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    x.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  onMouseDown(e) {
    console.log("Resizer.onMouseDown");

    this.props.updateStateResizing( this.props.id, true);
  }
  onMouseMove(e) {
    console.log("Resizer.onMouseMove");
    if( this.props.isResizing ){
      this.props.funcResizing( this.props.id, e.clientX, e.clientY);
    }
  }
  onMouseUp(e) {
    console.log("Resizer.onMouseUp");
    if( this.props.isResizing ){
      this.props.updateStateResizing( this.props.id, false);
    }
  }
  render() {
    const style = {
      width:  this.props.resizerWidth,
      height: this.props.resizerHeight,
    };
    return (
      <div className="resizer"
            style={style}
            onMouseDown={this.onMouseDown.bind(this)}
        ></div>
    );
  }
};
  export default DropArea;
  