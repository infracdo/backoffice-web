import React, { Component } from 'react';
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper';
import LayoutContent from '@zeep/components/utility/layoutContent';

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Dashboard</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
