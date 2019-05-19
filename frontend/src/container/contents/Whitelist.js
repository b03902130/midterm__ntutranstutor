import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonMaterial from '@material-ui/core/Button';

import Axios from 'axios';
Axios.defaults.withCredentials = true;

class Whitelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whitelist: [],
    };
    this.style = {
      fontSize: '14px',
      fontFamily: 'Noto Serif TC',
      overflowX: 'hidden',
    };
  }

  componentDidMount() {
    this.props.app.getAxios(`/whitelist`, data => {
      this.setState({whitelist: data.whitelist});
    });
  }

  delete(id) {
    this.props.app.getAxios(`/whitelist/${id}/delete`, data => {
      this.setState(state => {
        let whitelist = state.whitelist.filter(white => white.id !== id);
        state.whitelist = whitelist;
        return state;
      });
    });
  }

  render() {
    return (
      <div>
        {this.props.app.identity !== 'root' ? (
          <p>You are not authorized</p>
        ) : (
          <div style={{width: '90%', margin: 'auto'}}>
            <ButtonMaterial
              variant="contained"
              style={{
                border: '#2196f3 1px solid',
                backgroundColor: '#2196f3',
                padding: '0',
                marginLeft: '10px',
                marginTop: '30px',
                marginBottom: '20px',
              }}>
              <Link to="/whitelist/new" style={{textDecoration: 'none'}}>
                <span
                  style={{
                    fontSize: '16px',
                    color: 'white',
                    fontWeight: 700,
                    margin: '0',
                    padding: '0 24px 3px 24px',
                  }}>
                  新增白名單
                </span>
              </Link>
            </ButtonMaterial>
            <Grid container direction="row" justify="flex-start" spacing={24}>
              {this.state.whitelist.map(white => (
                <Grid item>
                  <Paper
                    style={{
                      padding: '10px',
                      margin: '10px',
                      maxWidth: '300px',
                    }}>
                    <p style={{fontSize: '24px'}}>{white.name}</p>
                    <p style={this.style}>{white.schoolid}</p>
                    <p style={this.style}>{white.gmail}</p>
                    <p style={this.style}>{white.facebook}</p>
                    <ButtonMaterial
                      variant="contained"
                      style={{
                        border: '#f44336 1px solid',
                        backgroundColor: '#f44336',
                        padding: '0',
                        marginLeft: '10px',
                        marginTop: '20px',
                        marginBottom: '20px',
                      }}>
                      <span
                        id={white.id}
                        onClick={e => {
                          this.delete(e.target.id);
                        }}
                        style={{
                          fontSize: '16px',
                          color: 'white',
                          fontWeight: 700,
                          margin: '0',
                          padding: '0 18px 3px 18px',
                        }}>
                        刪 除
                      </span>
                    </ButtonMaterial>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Whitelist;
