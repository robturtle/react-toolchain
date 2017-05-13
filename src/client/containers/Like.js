import Like from '../components/ProjectCard/Like';
import { connect } from 'react-redux';

const stateToProps = (state, ownProps) => ({
  liked: state.likes.find(ownProps.pid) ? true : false,
});

const dispatchToStates = dispatch => ({
  onLiked: likeProject(dispatch),
});

export default connect(stateToProps, dispatchToStates)(Like);