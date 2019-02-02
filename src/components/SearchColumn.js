import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import _ from 'lodash';
import { searchForUsers } from '../modules/user';
import UserList from './searchColumn/UserList';

const styles = theme => ({
  root: {
    width: '100%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    margin: 5,
    marginTop: 15,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchColumn extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.autocompleteSearchDebounced = _.debounce(this.autocompleteSearch, 500);
    this.autocompleteSearchThrottled = _.throttle(this.autocompleteSearch, 500);
  }

  handleChange = event => {
    const query = event.target.value
    this.setState({ query }, () => {
      if (query.length < 5 || query.endsWith(' ')) {
        this.autocompleteSearchThrottled(query);
      } else {
        this.autocompleteSearchDebounced(query);
      }
    });
  };

  autocompleteSearch = query => {
    this.props.searchForUsers({ query });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
        <Divider />
        <UserList query={this.state.query} />
      </div>
    )
  }
}

SearchColumn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    searchForUsers: (props) => dispatch(searchForUsers(props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchColumn));

