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
import Fab from '@material-ui/core/Fab';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const styles = {
  card: {
    maxWidth: 400,
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

  let departmentName = teacher.department.name;
  if (["法律學系法學組", "法律學系司法組", "法律學系財經法學組"].includes(departmentName)) {
    departmentName = "A 群組"
  }
  if (["物理學系", "土木工程學系", "機械工程學系", "工程科學及海洋工程學系", "生物環境系統工程學系", "生物機電工程學系", "電機工程學系", "資訊工程學系"].includes(departmentName)) {
    departmentName = "B 群組"
  }

  return (
    <Card className={classes.card} style={{ width: "350px" }}>
      <Link to={`/teachers/${teacher.id}`} style={{ textDecoration: 'none', color: 'white' }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={teacher.imgurl}
            title="Contemplative Reptile"
            style={{ height: "350px" }}
          />
          <CardContent style={{ margin: "5px", padding: "0" }}>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Grid item style={{ margin: "5px" }}>
                <Typography variant="h5">
                  <span style={{ fontWeight: 900 }}>{teacher.name}</span>
                </Typography>
              </Grid>
              <Grid item style={{ margin: "5px" }}>
                <Fab variant="extended" size="small" style={{ backgroundColor: "#2196f3", padding: "5px" }} aria-label="Add" className={classes.margin}>
                  <HashLink to={`/teachers#department-${departmentName}`} style={{ all: 'unset' }}>
                    <span style={{ fontSize: "16px", color: "white", padding: "0 4px 0 4px" }}>{teacher.department.name}</span>
                  </HashLink>
                </Fab>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          {/* <Grid item style={{ margin: "3px" }}>
            <Button size="small" style={{ border: "#f44336 1px solid", color: "#f44336", fontSize: "14px" }} variant="outlined" className={classes.button}>
              <Link to="/" style={{ all: 'unset' }}>{teacher.department.name}</Link>
            </Button>
          </Grid> */}
          {
            courses.map(course =>
              <Grid item style={{ margin: "3px" }}>
                <Button size="small" style={{ border: "#26a69a 1px solid", color: "#26a69a", fontSize: "14px", padding: "5px" }} variant="outlined" className={classes.button}>
                  <HashLink to={`/courses#subject-${course.subject.name}`} style={{ all: 'unset' }}>{course.subject.name}</HashLink>
                </Button>
              </Grid>
            )
          }
        </Grid>
      </CardActions>
    </Card >
  );
}

TeacherCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherCard);