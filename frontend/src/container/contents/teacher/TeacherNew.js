import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ButtonMaterial from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Imgur from './Imgur';

import Axios from 'axios';
Axios.defaults.withCredentials = true;

class TeacherNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        id: this.props.app.teacherid,
        name: this.props.app.name,
        department: '就讀科系',
        imgurl: this.props.app.imgurl,
        description: '',
      },
      filename: 'Choose file',
      submitted: false,
    };
    this.registered = false;
  }

  componentWillReceiveProps() {
    this.setState(state => ({
      info: {
        id: this.props.app.teacherid,
        name: this.props.app.name,
        imgurl: this.props.app.imgurl,
        department: '就讀科系',
        description: '',
      },
    }));
  }

  teacherChange = prop => event => {
    let content = event.target.value;
    this.setState(state => {
      state.info[prop] = content;
      return state;
    });
  };

  imgLoaded = e => {
    if (!this.registered) {
      this.registered = true;
      this.uploader = new Imgur({
        targetClass: '.imgurUploader',
        clientid: '428e97466328a8c',
        callback: this.imageUploaded,
      });
    }
  };

  imageUploaded = res => {
    if (res.success === true) {
      console.log(`Image uploaded to Imgur: ${res.data.link}`);
      this.setState(state => ({info: {...state.info, imgurl: res.data.link}}));
    }
  };

  fileSelected = e => {
    this.setState({filename: e.target.files[0].name.slice(0, 23)});
  };

  change = e => {
    let content = e.target.value;
    if (e.target.id === 'teacher_name') {
      this.setState(state => ({info: {...state.info, name: content}}));
    } else if (e.target.id === 'teacher_description') {
      this.setState(state => ({info: {...state.info, description: content}}));
    }
  };

  submit = () => {
    if (this.state.info.department === '就讀科系') {
      alert('請選擇就讀科系');
    } else if (
      this.state.info.description === '' ||
      this.state.info.name === ''
    ) {
      alert('請完整填寫資訊');
    } else {
      this.props.app.postAxios(this.props.match.path, this.state.info, data => {
        this.setState(state => ({
          submitted: true,
          info: {...state.info, id: data.teacherid},
        }));
        this.props.app.updateSession();
        this.props.app.updateDatabase();
      });
    }
  };

  render() {
    return (
      <div>
        {!this.props.app.identity ||
        !['candidate', 'root'].includes(this.props.app.identity) ? (
          <Redirect to="/" />
        ) : this.state.submitted ? (
          <Redirect to={`/teachers/${this.state.info.id}`} />
        ) : (
          <div id="panel">
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start">
              <Grid item sm={12} md={6} className="subpanel">
                <img
                  alt="teacher"
                  id="teacherImg"
                  src={this.state.info.imgurl}
                  onLoad={this.imgLoaded}
                />
              </Grid>
              <Grid item sm={12} md={6} className="subpanel">
                <div id="teacherText" style={{marginTop: '30px'}}>
                  <TextField
                    id="nameEdit"
                    label="教師名稱"
                    value={this.state.info.name}
                    onChange={this.teacherChange('name')}
                    margin="normal"
                    variant="outlined"
                    style={{margin: '15x 0 15px 0', display: 'block'}}
                    placeholder="臺轉會"
                  />
                  <TextField
                    select
                    InputProps={{
                      style: {
                        fontSize: '20px',
                        display: 'block',
                        fontWeight: 700,
                        color: '#546e7a',
                        fontFamily: 'Noto Serif TC',
                      },
                    }}
                    variant="outlined"
                    label="科系名稱"
                    value={this.state.info.department}
                    onChange={this.teacherChange('department')}
                    style={{margin: '15px 0 15px 0', minWidth: '200px'}}
                    placeholder="請選擇你的科系">
                    {this.props.app.departmentOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div
                    className="custom-file imgurUploader"
                    style={{
                      width: '300px',
                      margin: '12px 0 15px 0',
                      display: 'block',
                    }}>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      onChange={this.fileSelected}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                      style={{
                        color: '#b0bec5',
                        fontFamily: 'Noto Serif TC',
                        fontWeight: 700,
                      }}>
                      {this.state.filename}
                    </label>
                  </div>
                  <TextField
                    id="descriptionEdit"
                    label="教師個人介紹"
                    fullWidth
                    multiline
                    value={this.state.info.description}
                    onChange={this.teacherChange('description')}
                    margin="normal"
                    variant="outlined"
                    style={{margin: '15px 0 15px 0'}}
                    rowsMax={100}
                    rows={10}
                    placeholder="因為我每天都大喊三聲高雄發大財，成績變好、交到女友、也考上台大了！"
                    InputProps={{
                      style: {
                        fontSize: '16px',
                        display: 'block',
                        fontWeight: 700,
                        color: '#546e7a',
                        fontFamily: 'Noto Serif TC',
                        width: '100%',
                      },
                    }}
                  />
                  <div style={{marginBottom: '30px'}}>
                    <ButtonMaterial
                      onClick={this.submit}
                      variant="contained"
                      style={{
                        border: '#26a69a 1px solid',
                        backgroundColor: '#26a69a',
                        padding: '0',
                        marginRight: '12px',
                        marginTop: '12px',
                      }}>
                      <span
                        style={{
                          fontSize: '16px',
                          color: 'white',
                          fontWeight: 700,
                          margin: '0',
                          padding: '0 24px 3px 24px',
                        }}>
                        儲 存
                      </span>
                    </ButtonMaterial>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default TeacherNew;
