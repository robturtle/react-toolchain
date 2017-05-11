import { connect } from 'react-redux';
import ProjectCards from '../components/ProjectCards';

const stateToProps = state => ({
  windowWidth: state.windowSize.windowWidth
});

const ResponsiveProjectCards = connect(stateToProps)(ProjectCards);

export default ResponsiveProjectCards;