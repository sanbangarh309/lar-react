import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import DropArea from './DropArea';
import CssArea from './CssArea';

const StyledFileExplorer = styled.div`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;  
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

export default class FileExplorer extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      hoverOn: null,
      contentCss: null,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(file){
    this.setState({ selectedFile: file }); 
  }

  onHover(file){
    console.log('hovering on component');
    this.setState({ hoverOn: file.path }); 
  }

  contentCssMethod(properties){
    console.log('hovering on component');
    this.setState({ contentCss: properties }); 
  }

  render() {
    const { selectedFile, hoverOn, contentCss } = this.state;

    return (
      <StyledFileExplorer>
        <TreeWrapper>
          <Tree onSelect={this.onSelect} onHover={this.onHover.bind(this)} />
        </TreeWrapper>
        <div id="myBox">
          { selectedFile && selectedFile.type === 'file' && selectedFile.content }
        </div>
        <DropArea
          contentType={hoverOn}
          contentCss={this.contentCssMethod.bind(this)}
        />
        <CssArea
          contentCss={contentCss}
        />
      </StyledFileExplorer>
    )
  }
}