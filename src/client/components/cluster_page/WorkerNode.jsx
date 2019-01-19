import React, { Component } from "react";
import {
  displayNodeInfo,
  hideNodeInfo
} from "../redux/actions/windowActions.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class WorkerNode extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = { intialSize: 12, size: 12, scaling: false, descaling: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.scaling && !prevState.scaling) {
      const target = this.state.intialSize * 1.2;
      const scale = function() {
        if (this.state.size <= target) {
          this.setState({ size: this.state.size + 1 });
          if (!this.state.descaling) {
            setTimeout(scale, 2);
          }
        } else {
          this.setState({ scaling: false });
        }
      }.bind(this);
      scale();
    } else if (this.state.descaling && !prevState.descaling) {
      const target = this.state.intialSize;
      const descale = function() {
        if (this.state.size != target) {
          this.setState({ size: this.state.size - 1 });
          if (!this.state.scaling) {
            setTimeout(descale, 2);
          }
        } else this.setState({ descaling: false });
      }.bind(this);
      descale();
    }
  }

  handleMouseEnter(e) {
    this.props.displayNodeInfo(e.target.getAttribute("nodeIndex"), {
      x: e.clientX + 50,
      y: e.clientY - 100
    });
    this.setState({ scaling: true, descaling: false });
  }

  handleMouseLeave(e) {
    this.props.hideNodeInfo(e.target.getAttribute("nodeIndex"));
    this.setState({ scaling: false, descaling: true });
  }

  handleOnClick(e) {
    this.props.hideNodeInfo(e.target.getAttribute("nodeIndex"));
  }

  render() {
    const dist = this.state.size;
    const { xScale, yScale } = this.props;
    return (
      <Link to={`/node`}>
        <polygon
          points={`${xScale}, ${yScale - dist * 3.3}
                ${xScale + dist * 2.7}, ${yScale - dist * 1.6} 
                ${xScale + dist * 2.7}, ${yScale + dist * 1.6}
                ${xScale}, ${yScale + dist * 3.3}
                ${xScale - dist * 2.7}, ${yScale + dist * 1.6}
                ${xScale - dist * 2.7}, ${yScale - dist * 1.6}
              `}
          fill="white"
          stroke="#326DE6"
          stroke-width="2"
          nodeIndex={this.props.nodeIndex}
          onClick={this.handleOnClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      </Link>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayNodeInfo: (nodeIndex, mouseInfo) =>
      dispatch(displayNodeInfo(nodeIndex, mouseInfo)),
    hideNodeInfo: (nodeIndex, mouseInfo) =>
      dispatch(hideNodeInfo(nodeIndex, mouseInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WorkerNode);