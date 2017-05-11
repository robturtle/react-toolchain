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
        <ProjectCards projects={
          [
            {
              title: 'A',
              contents: 'a project',
            },
            {
              title: 'B',
              contents: 'b project',
            },
            {
              title: 'C',
              contents: 'c project',
            },
            {
              title: 'D',
              contents: 'd project',
            },
            {
              title: 'E',
              contents: 'E project',
            },
            {
              title: 'A',
              contents: 'a project',
            },
            {
              title: 'B',
              contents: 'b project',
            },
            {
              title: 'C',
              contents: 'c project',
            },
            {
              title: 'D',
              contents: 'd project',
            },
            {
              title: 'E',
              contents: 'E project',
            },
            {
              title: 'A',
              contents: 'a project',
            },
            {
              title: 'B',
              contents: 'b project',
            },
            {
              title: 'C',
              contents: 'c project',
            },
            {
              title: 'D',
              contents: 'd project',
            },
            {
              title: 'E',
              contents: 'E project',
            },
            {
              title: 'A',
              contents: 'a project',
            },
            {
              title: 'B',
              contents: 'b project',
            },
            {
              title: 'C',
              contents: 'c project',
            },
            {
              title: 'D',
              contents: 'd project',
            },
            {
              title: 'E',
              contents: 'E project',
            },
          ]
        }/>
      </div>
    );
  }
};

export default Home;