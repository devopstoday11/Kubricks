import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { servicesAndPodsFetchData } from '../redux/actions/servicesAndPodsActions.js';
import ServiceType from './ServiceType.jsx';
import ViewModes from './ViewModes.jsx';

const Box = styled.div`
  height: 100%;
  margin: 0;
  padding: 1em;
  overflow: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const ServiceTypes = styled.div`
  text-align: center;
`;

class ServicesWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url = 'api/renderall';
    this.props.fetchData(url);
  }

  renderServiceTypes() {
    return this.props.serviceTypes.map(serviceType => (
      <ServiceType
        key={serviceType}
        type={serviceType}
        activeServices={this.props.activeServices}
        listOfServices={this.props.listOfServices}
        activeServiceTypes={this.props.activeServiceTypes}
      />
    ));
  }

  render() {
    return (
      <Box>
        <Title>View Mode</Title>
        <ViewModes />
        <Title>Services</Title>
        <ServiceTypes>{this.renderServiceTypes()}</ServiceTypes>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(servicesAndPodsFetchData(url)),
    toggleViewMode: url => dispatch(toggleViewMode)
  };
};

const mapStateToProps = state => {
  return {
    listOfServices: state.servicesReducer.listOfServices,
    activeServices: state.servicesReducer.activeServices,
    activeServiceTypes: state.servicesReducer.activeServiceTypes,
    serviceTypes: state.servicesReducer.serviceTypes
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesWindow);
