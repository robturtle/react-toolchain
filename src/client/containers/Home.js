import React from 'react';
import ProjectCards from './ProjectCards';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
  }

  render() {
    return (
      <div>
        <ProjectCards />
      </div>
    );
  }
};

export default Home;