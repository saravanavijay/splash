import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fuse from 'fuse.js';
import objectToArray from '../../utils/objectToArray';

import { actions as userActions } from '../../modules/user';

const searchOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "username",
    "name",
    "first_name",
  ]
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  noMatchesDiv: {
    padding: 5,
    marginTop: 10,
    textAlign: 'center',
  }
});

class UserList extends Component {

  handleListItemClick = (event, user) => {
    this.props.selectUser({ user });
  };

  render() {
    const { classes, filteredList, query } = this.props;
    if (query.length > 5 && filteredList.length === 0) {
      return (
        <div className={classes.noMatchesDiv}>No matches found</div>
      )
    }
    return (
      <List className={classes.root}>
        {
          filteredList.map((user) => (
            <ListItem 
              key={user.id}
              button
              selected={this.props.selectedUserId === user.id}
              onClick={event => this.handleListItemClick(event, user)}
            >
              <ListItemText primary={user.name} secondary={`@${user.username}`} />
            </ListItem>
          ))
        }
      </List>
    )
  }
}


UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, props) => {
  const { query } = props;
  const { records } = state.user;
  const fuse = new Fuse(objectToArray(records), searchOptions);
  const filteredList = fuse.search(query).slice(0, 10);
  const selectedUserId = state.user.selectUser ? state.user.selectUser.id : null;
  return {
    filteredList,
    selectedUserId,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (props) => dispatch(userActions.selectUser(props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserList));