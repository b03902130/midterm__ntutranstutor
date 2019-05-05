import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import { Link } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function TeacherCard(props) {
  const { classes, teacherid, allteachers, allcourses } = props;
  let teacher = allteachers[teacherid];
  let courses = teacher.courses;
  courses = courses.map(courseid => allcourses[courseid]);
  return (
    <Card className={classes.card}>
      <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={teacher.imgurl}
            title="Contemplative Reptile"
            style={{ height: "350px" }}
          />
          <CardContent>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Grid item style={{ margin: "5px" }}>
                <Typography variant="h5">
                  <span style={{ fontWeight: "bold" }}>{teacher.name}</span>
                </Typography>
              </Grid>
              <Grid item style={{ margin: "5px" }}>
                <Fab variant="extended" size="medium" style={{ backgroundColor: "#2196f3" }} aria-label="Add" className={classes.margin}>
                  <Link to="/" style={{ all: 'unset' }}>
                    <span style={{ fontSize: "16px", color: "white" }}>了解更多</span>
                  </Link>
                </Fab>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" style={{ border: "#f44336 1px solid", color: "#f44336", fontSize: "14px" }} variant="outlined" className={classes.button}>
          <Link to="/" style={{ all: 'unset' }}>{teacher.department.name}</Link>
        </Button>
        {
          courses.map(course =>
            <Button size="small" style={{ border: "#2196f3 1px solid", color: "#2196f3", fontSize: "14px" }} variant="outlined" className={classes.button}>
              <Link to="/" style={{ all: 'unset' }}>{course.subject.name}</Link>
            </Button>
          )
        }
      </CardActions>
    </Card >
  );
}

TeacherCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherCard);