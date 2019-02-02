import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Image from "react-graceful-image";

import { getPhotosForUser } from '../modules/photos';
import objectToArray from '../utils/objectToArray';


const styles = theme => ({
  root: {
    width: '100%',
  },
  imgStyle: {
    maxWidth: '100%',
    backgroundColor: 'gray',
  },
  // ulStyle: {
  //   listStyleType: 'none',
  // },
  rootGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 450,
  },
});

class PhotoGrid extends Component {
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.props.getPhotosForUser({ username: user.username });
    }
  }

  render() {
    const { classes, user, filteredPhotos } = this.props;
    if (!user) {
      return (
        <div className={classes.root}>
          Search for a User.
        </div>
      )
    }
    // const itemHeight = 150 * (photo.width / photo.height);
    return (
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          {user.name}'s Photos
        </Typography>
        <GridList cellHeight={160} className={classes.gridList} cols={5}>
          {filteredPhotos.map(photo => {
            const widthRatio = photo.width / photo.height;
            let cols = 1;
            if (widthRatio > 1) {
              cols = Math.floor(widthRatio);
            }
            return (
              <GridListTile key={photo.id} cols={cols}>
                <Image
                  src={photo.urls.regular}
                  alt={photo.description}
                  className={classes.imgStyle}
                  placeholderColor="gray"
                />
              </GridListTile>
            )
          }
          )}
        </GridList>
      </div>
    );
  }
}

PhotoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  const { user } = props;
  const { records } = state.photo;
  const photos = objectToArray(records);
  let filteredPhotos = [];
  if (user) {
    filteredPhotos = photos.filter((photo) => {
      return photo.user.id === user.id;
    })
  }
  return {
    filteredPhotos,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPhotosForUser: (props) => dispatch(getPhotosForUser(props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PhotoGrid));