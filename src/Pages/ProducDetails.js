import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProducDetails extends Component {
  render() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    return (
      <div>
        <p>lau</p>
      </div>
    );
  }
}

ProducDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProducDetails;
