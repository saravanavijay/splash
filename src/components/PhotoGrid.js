import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

class PhotoGrid extends Component {
  componentDidMount() {

  }

  render() {
    const { classes, user } = this.props;
    if (!user) {
      return (
        <div className={classes.root}>
          Search for a User.
        </div>
      )
    }
    return (
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
        {user.name}'s Photos
        </Typography>
        
      </div>
    );
  }
}

PhotoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // selectUser: (props) => dispatch(userActions.selectUser(props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PhotoGrid));