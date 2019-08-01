import React, { Component } from 'react';
import styles from './AbstractExplain.less';
import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class AbstractExplain extends Component {

  state = {
    cnTitle: '基于Web的论文修改与排版系统的设计与实现',
    egTitle: 'Design and Implementation of Web-based Paper Modification and Typesetting System',
    college: '计算机科学与软件学院、大数据学院',
    major: '计算机科学与技术',
    studentName:'陈景亮',
    guidanceTeacher: '吴伟坚',
    cnAbstract: '基于Web的论文修改与排版系统的设计与实现，主要介绍如何运用前端框架 React、Ant Design Pro 与 后台框架 Gardle、SpringBoot、Hibernate 来进行环境的搭建与网站的编写、运行。为了提高毕业生与指导老师的互动，让指导老师更清楚地了解到所要指导的学生在毕业论文上的进度与完成结果，所以根据现阶段毕业生找工作与书写毕业论文，有很大的时间冲突而设计的系统。因此，根据现阶段的需求，设计并实现适合，学生在线书写与修改毕业论文，指导老师能实时了解到学生的完成情况是本文需要解决的主要问题。',
    cnKeyWord: ["在线书写；", "论文修改；", "React；", "SpringBoot；", "师生互动；"],
    cnKeyWordList: [],
    egAbstract: 'The design and implementation of Web-based paper modification and typesetting system mainly introduces how to use front-end framework React, Ant Design Pro and background framework Gardle, SpringBoot, Hibernate to build the environment and compile and run the website. In order to improve the interaction between graduates and instructors, so that instructors can more clearly understand the progress and completion results of the graduation thesis for the students to be guided, so according to the present stage graduates to find jobs and write graduation thesis, there is a great time conflict and design of the system. Therefore, according to the current needs, the design and implementation of suitable, students write and modify graduation theses online, instructors can real-time understand the completion of students is the main problem to be solved in this paper.',
    studentEgName: 'Believe',
    egKeyWord: ["Online Writing;", "Paper Revision;", "React;", "Spring Boot;", "Teacher-Student Interaction"],
    egKeyWordList: [],
  };

  componentWillMount() {
    this.forCnKeyWord();
    this.forEgKeyWord();
  }

  // 渲染 中文标题
  renderCnTitle = () => {
    const { cnTitle } = this.state;
    return (
      <span>{ cnTitle }</span>
    );
  };

  // 渲染 学院 专业 学生姓名
  renderStuInfo = () => {
    const { college, major, studentName } = this.state;
    return (
      <div className={styles.stuInfo}>
        <span className={styles.stuInfoItem}>{ college }</span>
        <span className={styles.stuInfoItem}>{ major }</span>
        <span className={styles.stuInfoItem}>{ studentName }</span>
      </div>
    );
  };

  // 渲染 指导老师
  renderTeacher = () => {
    const { guidanceTeacher } = this.state;
    return (
      <div className={styles.teacher}>
        <span className={styles.teacherItem}>指导老师：</span>
        <span>{ guidanceTeacher }</span>
      </div>
    );
  };

  // 渲染中文摘要
  renderCnAbstract = () => {
    const { cnAbstract } = this.state;
    return (
      <div>
        <span className={styles.cnAbstractText}>　　摘　要：</span>
        <span>{cnAbstract}</span>
      </div>
    );
  };

  // 循环 中文关键字
  forCnKeyWord = () => {
    const { cnKeyWord } = this.state;
    const pages = [];
    for (let i = 0, len = cnKeyWord.length; i < len; i += 1) {
      pages.push(
        <span className={styles.cnKeyWord} key={cnKeyWord[i]}>{cnKeyWord[i]}</span>,
      );
    }
    this.setState({
      cnKeyWordList: pages
    })
  };

  // 渲染中文关键字
  renderCnKeyWords = () => {
    const { cnKeyWordList } = this.state;
    return (
      <div className={styles.cnKeyWordBox}>
        <span className={styles.cnKeyWordText}>　　关键词：</span>
        {cnKeyWordList}
      </div>
    )
  };

  // 渲染英文題目
  renderEgTitle = () => {
    const { egTitle } = this.state;
    return (
      <span className={styles.egTitle}>{ egTitle }</span>
    );
  };

  // 渲染 学生 英文名字
  renderStuEgName = () => {
    const { studentEgName } = this.state;
    return (
      <span>{ studentEgName }</span>
    );
  };

  // 渲染 英文摘要
  renderEgAbstract = () => {
    const { egAbstract } = this.state;
    return (
      <div>
        <span className={styles.egAbstractText}>　　Abstract：</span>
        <span>{egAbstract}</span>
      </div>
    );
  };

  // 循环 英文关键字
  forEgKeyWord = () => {
    const { egKeyWord } = this.state;
    const pages = [];
    for (let i = 0, len = egKeyWord.length; i < len; i += 1) {
      pages.push(
        <span className={styles.egKeyWord} key={egKeyWord[i]}>{egKeyWord[i]}</span>,
      );
    }
    this.setState({
      egKeyWordList: pages
    })
  };

  // 渲染 英文关键词
  renderEgKeyWords = () => {
    const { egKeyWordList } = this.state;
    return (
      <div className={styles.egKeyWordBox}>
        <span className={styles.egKeyWordText}>　　Key words：</span>
        {egKeyWordList}
      </div>
    )
  };

  render() {
    return (
      <PageHeaderWrapper title="封面说明页">
        <div className={styles.container}>

          <div className={styles.content}>

            {/* 中文标题 */}
            <div className={styles.cnTitleBox}>
              {this.renderCnTitle()}
            </div>

            {/* 学院 专业 学生姓名 指导老师 */}
            <div className={styles.infoBox}>
              {this.renderStuInfo()}
              {this.renderTeacher()}
            </div>

            {/* 中文摘要 */}
            <div className={styles.cnAbstractBox}>
              {this.renderCnAbstract()}
            </div>

            {/* 中文关键词 */}
            <div className={styles.keyBox}>
              {this.renderCnKeyWords()}
            </div>

            {/* 英文标题 */}
            <div className={styles.egTitleBox}>
              {this.renderEgTitle()}
            </div>

            {/* 学生英文名字 */}
            <div className={styles.egNameBox}>
              {this.renderStuEgName()}
            </div>

            {/* 英文摘要 */}
            <div className={styles.egAbstractBox}>
              {this.renderEgAbstract()}
            </div>

            {/* 英文关键字 */}
            <div className={styles.keyBox}>
              {this.renderEgKeyWords()}
            </div>

          </div>

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AbstractExplain;
