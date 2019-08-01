import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './WritingStandard.less';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

class WritingStandard extends Component {

  state = {
    pageTitle: '肇庆学院本科毕业论文（设计）写作',
    subTitle: '毕业论文的撰写内容与要求',
    articleExplain: '本科生毕业论文是本科教学中的重要环节，是考察学生知识的理解和综合运用能力的重要手段。为规范我校本科生毕业论文工作，进一步提高教育质量，特制订本规范。请毕业论文指导教师和学生认真阅读并按要求撰写。',
    wordsNumber: '除有特殊要求的专业外，文科类论文的正文部分（不包括目录、中/英文摘要、参考文献、致谢等）不少于6000字，理工科论文不少于4000字，文中西文字体统一用Times New Roman。各专业可根据需要确定具体的文字和字数要求，并报教务处备案。',
    thesisTitle: '论文题目应突出重点、简明扼要、能准确反应论文主要内容，要有较强的科学性、前瞻性和可行性。读者通过标题可大致了解毕业论文的内容、专业的特点和科学的范畴。中文题目一般不宜超过20个字，必要时可增加副标题。外文题目要与中文题目相对应，一般不宜超过12个实词。',
    cnAbstract: '摘要是对论文或设计内容的简短陈述，主要包括选题意义、主要论点、论证方法和结论，中文摘要在300字以内，语言力求精炼，应避免将摘要写成目录式的内容介绍。在摘要的下方另起一行，注明本文的关键词（3-5个）。关键词是供检索用的主题词条，应采用能覆盖论文主要内容的通用技术词条。按词条概念外延层次由左到右排列，摘要与关键词应在同一页。',
    egAbstract: '英文摘要应使用第三人称，内容与中文摘要应完全一致，符合英文语法习惯及行文规范。摘要下方另起一行注明英文关键词（Key words 3-5个）。',
    catalog: '论文目录是论文的提纲，应包括论文中全部章节的标题及页码，包含正文各章节标题、结论、参考文献、附录、致谢等。',
    mainBody: '正文是毕业论文的主体和核心部分，论文正文包括绪论（引言）、论文主体及结论部分。',
    introduction: '绪论（引言）一般包括本论文选题的背景、目的和意义，应解决的主要问题及应达到的要求；对国内外研究现状和相关领域中已有的研究成果的简要评述；介绍本项研究工作研究设想、研究方法或实验设计、理论依据或实验基础；涉及范围和预期结果等。要求言简意赅，注意不要与摘要雷同或成为摘要的注解。',
    thesisSubject: '论文主体是毕业论文的主要部分，要求结构合理，论点明确，层次分明，推理严密，重点突出，文字简练通顺。论文主体的内容根据不同学科有不同的特点。具体内容由各学院结合专业特点和实际制订本学院规定。',
    reference: '参考文献是毕业论文不可缺少的组成部分，它反映毕业论文的取材来源、材料的广博程度和材料的可靠程度，也是作者对他人知识成果的承认和尊重。凡有直接引用他人成果之处，需要按文中出现的顺序列出直接引用的主要参考文献。一份完整的参考文献可向读者提供一份有价值的信息资料，列入的文献应在10篇以上，鼓励学生引用近五年的最新学术研究成果。',
    appendix: '对于一些不宜放在正文中的重要支撑材料，可编入毕业论文的附录中。包括与论文有关的图表、计算机程序、运行结果、主要设备、仪器仪表的性能指标和测试精度等，附录的篇幅不宜太多。',
    thank: '谢辞应以简短的文字对课题研究与论文撰写过程中曾直接给予帮助的人员(例如指导教师、答疑教师及其他人员)表示自己的谢意。内容限一页。'
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

  // 渲染副标题
  renderSubtitle = () => {
    const { subTitle } = this.state;
    return (
      <div className={styles.subTitle}>
        <span>{subTitle}</span>
      </div>
    );
  };

  // 渲染论文书写说明
  renderArticleExplain = () => {
    const { articleExplain } = this.state;
    return (
      <div className={styles.renderBox}>
        <span className={styles.fontMargin}>{articleExplain}</span>
      </div>
    );
  };

  // 渲染 论文字数与文字要求
  renderWordsNumber = () => {
    const { wordsNumber } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>字数及文字</Divider>
        <span className={styles.fontMargin}>{ wordsNumber }</span>
      </div>
    );
  };

  // 渲染论文题目要求
  renderThesisTitle = () => {
    const { thesisTitle } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>论文题目</Divider>
        <span className={styles.fontMargin}>{ thesisTitle }</span>
      </div>
    );
  };

  // 渲染中文摘要和中文关键词
  renderCnAbstract = () => {
    const { cnAbstract } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>中文摘要和关键词</Divider>
        <span className={styles.fontMargin}>{ cnAbstract }</span>
      </div>
    );
  };

  // 渲染英文摘要与英文关键词
  renderEgAbstract = () => {
    const { egAbstract } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>英文摘要和关键词</Divider>
        <span className={styles.fontMargin}>{ egAbstract }</span>
      </div>
    );
  };

  // 渲染目录与正文要求
  renderCatalogAndMainBody = () => {
    const { catalog, mainBody } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>目录和正文</Divider>
        <span className={styles.fontMargin}>{ catalog }</span>
        <span className={styles.fontMargin}>{ mainBody }</span>
      </div>
    );
  };

  // 渲染绪论(引言)要求
  renderIntroduction = () => {
    const { introduction } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>绪论(引言)</Divider>
        <span className={styles.fontMargin}>{ introduction }</span>
      </div>
    );
  };

  // 渲染论文主体要求
  renderThesisSubject = () => {
    const { thesisSubject } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>论文主体</Divider>
        <span className={styles.fontMargin}>{ thesisSubject }</span>
      </div>
    );
  };

  // 渲染参考文献要求
  renderReference = () => {
    const { reference } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>参考文献</Divider>
        <span className={styles.fontMargin}>{ reference }</span>
      </div>
    );
  };

  // 渲染附录要求
  renderAppendix = () => {
    const { appendix } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>附录</Divider>
        <span className={styles.fontMargin}>{ appendix }</span>
      </div>
    );
  };

  // 渲染致谢要求
  renderThank = () => {
    const { thank } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>致谢</Divider>
        <span className={styles.fontMargin}>{ thank }</span>
      </div>
    );
  };


  render() {

    return (
      <PageHeaderWrapper title="书写规范">

        <div className={styles.container}>

          <div className={styles.content}>

            {/* 页面标题 */}
            {this.renderPageTitle()}

            {/* 副标题 */}
            {this.renderSubtitle()}

            {/* 文章说明 */}
            {this.renderArticleExplain()}

            {/* 字数及文字要求 */}
            {this.renderWordsNumber()}

            {/* 论文题目要求 */}
            {this.renderThesisTitle()}

            {/* 中文摘要和中文关键词 */}
            {this.renderCnAbstract()}

            {/* 英文摘要和英文关键词 */}
            {this.renderEgAbstract()}

            {/* 目录和正文 */}
            {this.renderCatalogAndMainBody()}

            {/* 绪论(引言) */}
            {this.renderIntroduction()}

            {/* 论文主体 */}
            {this.renderThesisSubject()}

            {/* 参考文献 */}
            {this.renderReference()}

            {/* 附录 */}
            {this.renderAppendix()}

            {/* 致谢 */}
            {this.renderThank()}

          </div>

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default WritingStandard;
