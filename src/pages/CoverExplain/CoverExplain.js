import React, { Component } from 'react';
import styles from './CoverExplain.less';
import zquLogo from '../../assets/zquLogo.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class CoverExplain extends Component {

  state = {
    title: ["毕", "业", "论", "文"],
    bottomText: "防肇庆学院教务处制",
    infoList: [
      {
        cnTitleText: '论文题目',
        cnTitle: '基于Web的论文修改与排版系统的设计与实现',
        egTitle: 'Design and Implementation of Web-based Paper Modification and Typesetting System'
      },
      {
        collegeText: '学　　院',
        college: '计算机科学与软件学院、大数据学院'
      },
      {
        majorText: '专　　业',
        major: '计算机科学与技术'
      },
      {
        gradeText: '年　　级',
        grade: '15科技3班'
      },
      {
        studentIdText: '学　　号',
        studentId: '201524131316'
      },
      {
        studentNameText: '学生姓名',
        studentName: '陈景亮'
      },
      {
        guidanceTeacherText: '指导老师',
        guidanceTeacher: '吴伟坚老师'
      },
      {
        finallyTimeText: '完成时间',
        finallyTime: '2019年03月01日'
      }
    ],
  };

  renderZQU = () => {
    return (
      <img src={zquLogo} alt="zqu" />
    );
  };

  renderTitle = () => {
    const { title } = this.state;
    return (
      title.map((element) => (
        <span className={styles.txt} key={element}>{element}</span>
      ))
    );
  };

  renderStuInfo = () => {

    const { infoList } = this.state;

    const pages = [];

    pages.push(

      <div className={styles.stuInfo} key={1}>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[0].cnTitleText}</span>
          <span className={styles.infoStyle}>{infoList[0].cnTitle}</span>
        </div>
        {/* <div className={styles.stuInfoBox} key="9">
          <span className={styles.textStyle} />
          <span className={styles.infoStyle}>{infoList[0].egTitle}</span>
        </div> */}

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[1].collegeText}</span>
          <span className={styles.infoStyle}>{infoList[1].college}</span>
        </div>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[2].majorText}</span>
          <span className={styles.infoStyle}>{infoList[2].major}</span>
        </div>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[3].gradeText}</span>
          <span className={styles.infoStyle}>{infoList[3].grade}</span>
        </div>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[4].studentIdText}</span>
          <span className={styles.infoStyle}>{infoList[4].studentId}</span>
        </div>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[5].studentNameText}</span>
          <span className={styles.infoStyle}>{infoList[5].studentName}</span>
        </div>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[6].guidanceTeacherText}</span>
          <span className={styles.infoStyle}>{infoList[6].guidanceTeacher}</span>
        </div>

        <div className={styles.stuInfoBox}>
          <span className={styles.textStyle}>{infoList[7].finallyTimeText}</span>
          <span className={styles.infoStyle}>{infoList[7].finallyTime}</span>
        </div>

      </div>

    );

    return (
      pages.map((element) => {
        return element
      })
    );
  };

  renderCoverBottom = () => {
    const { bottomText } = this.state;
    return (
      <span className={styles.bottomTxt}>{ bottomText }</span>
    );
  };

  render() {

    return (
      <PageHeaderWrapper title="封面说明页">
        <div className={styles.container}>

          {/* zqu logo */}
          <div className={styles.logo}>{this.renderZQU()}</div>

          {/* 毕业论文字样 */}
          <div className={styles.Headline}>{this.renderTitle()}</div>

          {/* 学生信息 */}
          <div className={styles.stuInfo}>{this.renderStuInfo()}</div>

          {/* 防肇庆学院教务处制 */}
          <div className={styles.bottom}>{this.renderCoverBottom()}</div>

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CoverExplain;
