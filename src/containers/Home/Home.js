import React from 'react';
import './Home.less';

export default class Home extends React.PureComponent {
  render() {
    return (
      <div style={{ textAlign: 'center' }} >
        <h2 className="orange">Hello, This is webpack demo for React</h2>
        <p>:D</p>
      </div>
    );
  }
}
