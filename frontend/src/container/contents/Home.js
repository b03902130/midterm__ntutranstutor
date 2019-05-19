import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EntryCard from '../../component/EntryCard';
import './Home.css';

import Axios from 'axios';
Axios.defaults.withCredentials = true;

class Home extends Component {
  render() {
    const styles = {
      card: {
        margin: '20px',
      },
      link: {
        textDecoration: 'none',
      },
    };
    return (
      <div>
        <div id="frontimg">
          <img
            alt="cover"
            src="/cover11.png"
            style={{
              width: '100%',
              marginTop: '-40px',
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          />
        </div>
        <div style={{margin: '30px 0'}} />
        <p
          className="shallowGray bolder font"
          style={{
            fontSize: '26px',
            textAlign: 'center',
            padding: 0,
            width: '90%',
            margin: 'auto',
          }}>
          POWERED BY NTUTRANS
        </p>
        <div style={{margin: '60px 0'}} />
        <Divider style={{width: '80%', margin: 'auto'}} />
        <div style={{margin: '60px 0'}} />
        <p
          className="middleGray boldest font"
          style={{
            fontSize: '26px',
            textAlign: 'center',
            padding: 0,
            margin: 0,
          }}>
          NAVIGATION
        </p>
        <div style={{margin: '0 0 20px 0'}} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          style={{width: '90%', margin: 'auto'}}>
          <Grid item style={styles.card}>
            <Link to="/teachers" style={styles.link}>
              <EntryCard
                imgurl="/teachers.jpg"
                title="所有教師"
                description="我們相信只有親身走過轉考這條路的夥伴，才有能力帶領考生面對轉考的各種壓力與陷阱，並能鼓勵考生在孤立無援時堅持住最初的夢想。"
              />
            </Link>
          </Grid>
          <Grid item style={styles.card}>
            <Link to="/courses" style={styles.link}>
              <EntryCard
                imgurl="/courses.jpg"
                title="所有課程"
                description="將老師依據授課科目排序，你可以在各個科目欄位看到所有教授該科目的老師。如果找不到你想要的科目的話，可以利用分類搜尋查看，有可能該科目目前尚無老師教授。"
              />
            </Link>
          </Grid>
          <Grid item style={styles.card}>
            <Link to="/find" style={styles.link}>
              <EntryCard
                imgurl="/index.jpg"
                title="分類搜尋"
                description="轉學考的所有科系與科目數量也不少呢，找不到想要的資訊嗎？你可以在上方的導覽列點集分類搜尋，並用科系/科目快速找到你想要的老師。"
              />
            </Link>
          </Grid>
        </Grid>
        <div style={{margin: '40px 0'}} />
        <Divider style={{width: '80%', margin: 'auto'}} />
        <div style={{margin: '60px 0'}} />
        <p
          className="middleGray boldest font"
          style={{
            fontSize: '26px',
            textAlign: 'center',
            padding: 0,
            margin: 0,
          }}>
          FACEBOOK
        </p>
        <div style={{margin: '0 0 20px 0'}} />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          style={{width: '70%', margin: 'auto'}}>
          <Grid item style={styles.card}>
            <a href="https://www.facebook.com/ntutrans/" style={styles.link}>
              <EntryCard
                imgurl="/trans.png"
                title="台大轉學生聯會"
                description="英文縮寫為NTUTRANS，為針對台大轉學生的校內社團。舉辦聯誼活動外，也積極爭取轉學生權益，並定期舉辦大型的轉學考考試說明會，向考生分享上榜學長姐的心得與技巧，每年都有數百人參加。"
              />
            </a>
          </Grid>
          <Grid item style={styles.card}>
            <a
              href="https://www.facebook.com/tutorntutrans/"
              style={styles.link}>
              <EntryCard
                imgurl="/tutor.png"
                title="台大轉學考家教平台"
                description="家教平台為臺大轉聯會底下的部門之一，致力於提供考生有經驗的老師，也提供轉學生夥伴一些工作機會，希望能共創雙贏。作為無營利組織，家教平台並未向老師或學生收取任何費用，營運由轉聯會內幹部負責。"
              />
            </a>
          </Grid>
        </Grid>
        <div style={{margin: '60px 0'}} />
      </div>
    );
  }
}

export default Home;
