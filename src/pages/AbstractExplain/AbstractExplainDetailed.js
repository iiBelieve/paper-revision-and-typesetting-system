import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './AbstractExplainDetailed.less';
import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class AbstractExplainDetailed extends Component {

  state = {
    pageTitle: '论文标题与摘要的注意事项',
    pageRequirements: {
      pageMargin: '[ 上: 2.5厘米 ]；[ 下: 2.0厘米 ]；[ 左: 2.8厘米 ]；[ 右: 2.4厘米 ]',
      settingPageMargin: '打开论文文档(Word文档) -- 文档左上角 [ 布局 ]，点击布局 -- 点击 [ 页边距 ] -- 选择最底部的 [ 自定义边距(A) ]',
      settingLineSpacing: '按住鼠标左键，选择要设置行间距的 字/段落，[ 右击选择的文字或段落 ] -- [ 段落(P) ] -- [ 间距 ] -- [ 行距(I) ] -- 选择相应的间距 ',
      fontFamily: '[ 中文字体：黑体，宋体 ]、[ 英文字体：Times New Roman ]，注：正文中所有西文字体采用[ Times New Roman ]'
    },
    cnTitleRequirements: {
      cnTitleFont: '[ 字号：小二号 ]、[ 字体：黑体 ]、[ 居中 ]',
      Subheading: '若有副标题，则副标题的字号样式为 [ 字号：四号 ]、[ 字体：黑体 ]、[样式：加粗]、[ 居中 ]',
      cnTitleSubheading: '正标题和副标题 [ 行间距：单倍行距 ]，正标题在上，副标题在下',
    },
    cnStuInfoRequirements : {
      cnStuInfo: "[ 字号：小四号 ]、[ 字体：宋体 ]、[ 居中 ]、[ 行间距：单倍行距 ]",
      guidanceTeacher: "学生基本信息与指导老师分两行书写"
    },
    cnAbstractRequirements: {
      cnAbstractTitleFont: "[ 摘要：] 与 [ 关键字：] -- [ 字号：五号 ]、[ 字体：宋体 ]、[ 样式：加粗 ]",
      cnAbstractContentFont: '摘要与关键字的内容为 [字号：五号]、[ 字体：宋体 ]、[ 行间距：18磅 ]',
      cnAbstractKeyWords: '每个中文关键字以中文分号结束 -- [ ；]，最后一个关键字不用添加分号',
    },
    egTitleRequirements: {
      egTitleFont: '[ 字号：三号 ]、[ 字体：Times New Roman ]、[ 样式：加粗 ]、[ 居中 ]',
      Subheading: '若有副标题，则副标题的字号样式为 [ 字号：四号 ]、[ 字体：Times New Roman ]、[样式：加粗]、[ 居中 ]',
      egTitleSubheading: '正标题和副标题 [ 行间距：单倍行距 ]，正标题在上，副标题在下',
    },
    egNameRequirements: {
      studentEgName: '[ 字号：小四号 ]、[ 字体：Times New Roman ]、[ 居中 ]、[ 行间距：单倍行距 ]'
    },
    egAbstractRequirements: {
      egAbstractTitleFont: "[ Abstract: ] 与 [ Key words: ]、[ 字号：五号 ]、[样式：加粗]、[ 字体：Times New Roman ]",
      egAbstractContentFont: '摘要与关键字的内容 [ 字号：五号 ]、[ 行间距：18磅 ]',
      egAbstractKeyWords: '每个英文关键字以英文分号结束 -- [ ; ]，最后一个关键字不用添加分号',
    }
  };


  // 渲染页面标题
  renderPageTitle = () => {
    const { pageTitle } = this.state;
    return (
      <div className={styles.pageTitle}>
        <span>{pageTitle}</span>
      </div>
    );
  };

  // 渲染 页面边距 要求
  renderPageRequirements = () => {
    const { pageRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>页面设置</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>页面边距：</span>
          <span>{pageRequirements.pageMargin}</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>设置边距：</span>
          <span>{pageRequirements.settingPageMargin}</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>设置行距：</span>
          <span>{ pageRequirements.settingLineSpacing }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>设置字体：</span>
          <span>{ pageRequirements.fontFamily }</span>
        </div>

      </div>
    );
  };

  // 渲染 中文标题 要求
  renderCnTitleRequirements = () => {
    const { cnTitleRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>中文标题</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>标题字体：</span>
          <span>{ cnTitleRequirements.cnTitleFont }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>副　标题：</span>
          <span>{ cnTitleRequirements.Subheading }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>标题样式：</span>
          <span>{ cnTitleRequirements.cnTitleSubheading }</span>
        </div>

      </div>
    );
  };

  // 渲染 中文学生信息与指导老师信息
  renderCnStuInfoRequirements = () => {
    const { cnStuInfoRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>学生信息与指导老师</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>字体要求：</span>
          <span>{ cnStuInfoRequirements.cnStuInfo }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>书写方式：</span>
          <span>{ cnStuInfoRequirements.guidanceTeacher }</span>
        </div>

      </div>
    );
  };

  // 渲染 中文摘要 与 关键字 要求
  renderCnAbstractRequirements = () => {
    const { cnAbstractRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>中文摘要与关键字</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>标题字体：</span>
          <span>{ cnAbstractRequirements.cnAbstractTitleFont }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>内容字体：</span>
          <span>{ cnAbstractRequirements.cnAbstractContentFont }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>关键　字：</span>
          <span>{ cnAbstractRequirements.cnAbstractKeyWords }</span>
        </div>

      </div>
    );
  };

  // 渲染 英文标题 要求
  renderEgTitleRequirements = () => {
    const { egTitleRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>英文标题</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>标题字体：</span>
          <span>{ egTitleRequirements.egTitleFont }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>副　标题：</span>
          <span>{ egTitleRequirements.Subheading }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>标题样式：</span>
          <span>{ egTitleRequirements.egTitleSubheading }</span>
        </div>

      </div>
    );
  };

  // 渲染 学生的英文名字
  renderStudentEgName = () => {
    const { egNameRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>学生英文名字</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>字体要求：</span>
          <span>{ egNameRequirements.studentEgName }</span>
        </div>

      </div>
    );
  };

  // 渲染 英文摘要 与 滚尖子 要求
  renderEgAbstractRequirements = () => {
    const { egAbstractRequirements } = this.state;
    return (
      <div className={styles.renderBox}>

        <Divider orientation="left" className={styles.divider}>英文摘要与关键字</Divider>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>标题字体：</span>
          <span>{ egAbstractRequirements.egAbstractTitleFont }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>内容字体：</span>
          <span>{ egAbstractRequirements.egAbstractContentFont }</span>
        </div>

        <div className={styles.contentBox}>
          <span className={styles.fontMargin}>关键　字：</span>
          <span>{ egAbstractRequirements.egAbstractKeyWords }</span>
        </div>

      </div>
    );
  };

  render() {

    return (
      <PageHeaderWrapper title="摘要说明页模版">

        <div className={styles.container}>

          <div className={styles.content}>

            {/* 页面标题 */}
            {this.renderPageTitle()}

            {/* 页面边距 */}
            {this.renderPageRequirements()}

            {/* 中文标题 */}
            {this.renderCnTitleRequirements()}

            {/* 中文学生信息 */}
            {this.renderCnStuInfoRequirements()}

            {/* 中文摘要 与 关键字 */}
            {this.renderCnAbstractRequirements()}

            {/* 英文标题 */}
            {this.renderEgTitleRequirements()}

            {/* 英文名字 */}
            {this.renderStudentEgName()}

            {/* 英文摘要 与 关键字 */}
            {this.renderEgAbstractRequirements()}

          </div>

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AbstractExplainDetailed;
