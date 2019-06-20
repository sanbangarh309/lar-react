import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import folderData from './TreeData.js';
export default class Tree extends Component {
     constructor(props) {
        super(props);
        this.folders = folderData.getList();
        this.state = {
          nodes: Object.assign({}, this.folders),
        };
        console.log(this.state.folders);
        this.getRootNodes = this.getRootNodes.bind(this);
        this.getChildNodes = this.getChildNodes.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onNodeSelect = this.onNodeSelect.bind(this);
      }
      getRootNodes() {
        const { nodes } = this.state;
        return values(nodes).filter(node => node.isRoot === true);
      }

      getChildNodes(node) {
        const { nodes } = this.state;
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
      }  

      onToggle(node) {
        const { nodes } = this.state;
        nodes[node.path].isOpen = !node.isOpen;
        this.setState({ nodes });
      }

      // onNodeSelect = node => {
      //   const { onSelect } = this.props;
      //   onSelect(node);
      // }
      onNodeSelect(node) {
        const { onSelect } = this.props;
        onSelect(node);
      }

      onNodeHover(node) {
        const { onHover } = this.props;
        onHover(node);
      }

     render() {
        const rootNodes = this.getRootNodes();
        return (
          <div>
            { rootNodes.map(node => (
              <TreeNode 
                node={node}
                getChildNodes={this.getChildNodes}
                onToggle={this.onToggle}
                onNodeSelect={this.onNodeSelect}
                onNodeHover={this.onNodeHover.bind(this)}
              />
            ))}
          </div>
        )
    }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};