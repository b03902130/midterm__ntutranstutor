import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper"
import Divider from '@material-ui/core/Divider';
import EntryCard from "../../component/EntryCard";
import "./Home.css";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Home extends Component {
    render() {
        const styles = {
            card: {
                margin: "20px",
            },
            link: {
                textDecoration: "none"
            }
        }
        return (
            <div>
                <div id="frontimg">
                    <img src="/cover3.png" style={{ width: "100%", marginTop: "-40px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} />
                </div>
                <div style={{ margin: "30px 0" }}></div>
                <p className="shallowGray bolder font" style={{ fontSize: "26px", textAlign: "center", padding: 0, margin: 0, width: "90%", margin: "auto" }}>POWERED BY NTUTRANS</p>
                <div style={{ margin: "60px 0" }}></div>
                <Divider style={{ width: "80%", margin: "auto" }} />
                <div style={{ margin: "60px 0" }}></div>
                <p className="middleGray boldest font" style={{ fontSize: "26px", textAlign: "center", padding: 0, margin: 0 }}>NAVIGATION</p>
                <div style={{ margin: "0 0 20px 0" }}></div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    style={{ width: "90%", margin: "auto" }}
                >
                    <Grid item style={styles.card}>
                        <Link to="/teachers" style={styles.link}>
                            <EntryCard imgurl="/teachers.jpg" title="所有教師" description="我們相信只有親身走過轉考這條路的夥伴，才有能力帶領考生面對轉考的各種壓力、與陷阱。並鼓勵考生" />
                        </Link>
                    </Grid>
                    <Grid item style={styles.card}>
                        <Link to="/courses" style={styles.link}>
                            <EntryCard imgurl="/courses.jpg" title="所有課程" description="來自各個科系的老師，針對轉考的題型方向。" />
                        </Link>
                    </Grid>
                    <Grid item style={styles.card}>
                        <Link to="/find" style={styles.link}>
                            <EntryCard imgurl="/index.jpg" title="分類搜尋" description="轉學考的所有科系與科目數量也不少呢，找不到想要的資訊嗎？你可以在上方的導覽列典籍分類搜尋，並用科系/科目快速找到你想要的老師。" />
                        </Link>
                    </Grid>
                </Grid>
                <div style={{ margin: "40px 0" }}></div>
                <Divider style={{ width: "80%", margin: "auto" }} />
                <div style={{ margin: "60px 0" }}></div>
                <p className="middleGray boldest font" style={{ fontSize: "26px", textAlign: "center", padding: 0, margin: 0 }}>FACEBOOK</p>
                <div style={{ margin: "0 0 20px 0" }}></div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    style={{ width: "70%", margin: "auto" }}
                >
                    <Grid item style={styles.card}>
                        <a href="https://www.facebook.com/tutorntutrans/" style={styles.link}>
                            <EntryCard imgurl="/tutor.png" title="台大轉學考家教平台" description="作為無營利組織，家教平台致力於提供考生有經驗的老師，也提供轉學生夥伴工作的機會，希望能共創雙贏。" />
                        </a>
                    </Grid>
                    <Grid item style={styles.card}>
                        <a href="https://www.facebook.com/ntutrans/" style={styles.link}>
                            <EntryCard imgurl="/trans.png" title="台大轉學生聯會" description="英文縮寫為NTUTRANS，為針對轉學生身" />
                        </a>
                    </Grid>
                </Grid>
                <div style={{ margin: "60px 0" }}></div>
            </div>
        );
    };
}

export default Home;
