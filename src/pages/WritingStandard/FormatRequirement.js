import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './FormatRequirement.less';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

class FormatRequirement extends Component {

  state = {
    pageTitle: '肇庆学院本科毕业论文（设计）写作',
    subTitle: '毕业论文的撰写格式要求',
    paperFormat: "毕业论文应选用A4型纸。",
    textFormat: [
      "1、页面：页边距上，3.2cm；下，2.8cm；左，3cm；右，2.5cm。行间距20磅。",
      "2、标题：人文学科类论文一般使用一、（一）、1、……；理工科论文或设计一般使用1、1.1、1.1.1……等序号表示。",
      "一级标题（1  2  等）：四号黑体、行间距20磅、段前、段后各24磅、居左，从1开始编号，依次1 2 3…顺序编号，数字后留一空格；",
      "二级标题（1.1  2.1等）：小四号黑体、行间距20磅、段前12磅、段后12磅、左对齐，数字后留一空格；",
      "三级标题(1.1.1  1.2.1等)：小四号黑体、行间距20磅、段前后6磅、左对齐，数字后留一空格。",
      "3、正文部分：中文用宋体，小四，行间距20磅、两端对齐、首行缩进2字符(汉字字符)。（正文中的英文字符一律用  Times New Roman字体 ，标题中的英文字符一律用Arial字体）",
      "页眉2.2cm，页脚2.0cm； 行间距20磅。奇数页与偶数页页眉不同，奇数页页眉字样为“肇庆学院毕业论文”，偶数页页眉字样为论文题目。页眉宋体五号，居中排列；页码五号，位于页面底端居中排列。",
      "4、注释：注释均采用脚注方式，使用小五宋体字，以“①”式序号按顺序排列。正文序号用“上标”形式表示。",
      "5、参考文献：序号使用[1]、[2]按顺序排列。“参考文献”四字使用四号黑体顶格，参考文献内容使用小四宋体，行间距20磅。",
      "6、致谢：“致谢”二字使用四号黑体，居中，致谢内容使用小四宋体，行间距20磅。",
      "7、论文页码：页脚居中、阿拉伯数字（五号新罗马体）从正文部分开始连续编码。"
    ],
    textFormatList: [],
    catalog: "目录应另起一页，包括论文中的各级标题。“目录”二字使用小二号黑体居中，目录各级标题字体统一用小四宋体，行间距20磅。目录原则上不超过三级标题。",
    abstractAndKeyWords: [
      "中文摘要和关键词列入论文标题之后。摘要正文下方另起一行顶格打印“关键词”款项，每个关键词之间用“；”分开，最后一个关键词不打标点符号。",
      "中文“摘要”二字和“关键词”三字使用小四号黑体顶格书写，“摘”与“要”之间空两格，中文摘要内容和具体关键词使用小四号宋体，行间距20磅。",
      "英文题目列入论文参考文献之后，小二号Times New roman加粗居中。英文“摘要”和英文“关键词”使用小四号Times New roman加粗顶格书写，英文摘要内容和具体关键词使用小四号Times New roman，行间距20磅。"
    ],
    abstractAndKeyWordsList: [],
    termsAndLetters: [
      "1、科学技术名词术语尽量采用全国自然科学名词审定委员会公布的规范词或国家标准、部标准中规定的名称，尚未统一规定或叫法有争议的名词术语，可采用惯用的名称。",
      "2、特定含义的名词术语或新名词、以及使用外文缩写代替某一名词术语时，首次出现时应在括号内注明其含义，如：OECD（Organization for Economic Co-operation and Development）代替经济合作发展组织。",
      "3、外国人名一般采用英文原名，可不译成中文，英文人名按姓前名后的原则书写。一般很熟知的外国人名(如牛顿、爱因斯坦、达尔文、马克思等)可按通常标准译法写译名。",
      "4、文中代表变量的英文字母必须用斜体，其他用正体。圆周率π、自然底数e等均应为正体。"
    ],
    termsAndLettersList: [],
    symbolsAndUnits: [
      "1、论文中某一物理量的名称和符号应统一，一律采用国务院发布的《中华人民共和国法定计量单位》。单位名称和符号的书写方式，应采用国际通用符号。",
      "2、在不涉及具体数据表达时允许使用中文计量单位如“千克”。",
      "3、表达时刻应采用中文计量单位，如“下午3点10分”，不能写成“3h10min”，在表格中可以用“3:10PM”表示。"
    ],
    symbolsAndUnitsList: [],
    number: "文中除习惯上用中文数字表示的以外，一般均采用阿拉伯数字，年份一概写全数，如2015年。",
    formula: [
      "1、公式应另起一行写在稿纸中央。一行写不完的长公式，最好在等号处转行，如做不到这一点，可在运算符号（如“﹢”、“﹣”号）处转行，等号或运算符号应在转行后的行首。",
      "2、公式的编号用圆括号括起，放在公式右边行末，在公式和编号之间不加虚线。公式按全文统编序号，如（式4）。子公式可不编序号，需要引用时可加编a、b、c……，重复引用的公式不得另编新序号。公式序号必须连续，不得重复或跳缺。",
      "3、文中引用某一公式时，写成“由式4”。"
    ],
    formulaList: [],
    form: [
      "1、表格必须与论文叙述有直接联系，不得出现与论文叙述脱节的表格。表格中的内容在技术上不得与正文矛盾。" ,
      "2、每个表格都应有自己的标题和序号。标题应写在表格上方正中，不加标点，序号写在标题左方，后空一格。表题使用五号黑体，表文使用五号宋体，表格采用三线表。",
      "3、全文的表格统一编序，表序必须连续，不得跳缺。",
      "4、表格允许下页接写，接写时标题省略，表头应重复书写，并在右上方写“续表××”。多项大表可以分割成块，多页书写，接口处必须注明“接下页”、“接上页”、“接第×页”字样。",
      "5、表格应放在离正文首次出现处最近的地方，不应超前和过分拖后。",
      "6、如在一页，表格与正文之间需空一行。"
    ],
    formList: [],
    illustration: [
      "1、插图应与文字内容相符，技术内容正确。所有制图应符合国家标准和专业标准。对无规定符号的图形应采用该行业的常用画法。",
      "2、每幅插图应有标题和序号，全文的插图统一编序，如：图4-8。图序必须连续，不重复，不跳缺。图题使用五号黑体位于插图下方居中。",
      "3、由若干分图组成的插图，分图用a、b、c……标序。分图的图名以及图中各种代号的意义，以图注形式写在图题下方，先写分图名，另起行写代号的意义。",
      "4、图与图标题、图序号为一个整体，不得拆开排版为两页。当页空白不够排版该图整体时，可将其后文字部分提前，将图移至次页最前面。",
      "5、对坐标轴必须进行文字标示，有数字标注的坐标图必须注明坐标单位。",
      "6、如在一页，插图与正文之间需空一行。"
    ],
    illustrationList: [],
    referenceText: "参考文献的著录应符合国家标准，参考文献的序号左顶格，并用数字加方括号表示，如“[1]”。每一条参考文献著录均以“.”结束。具体各类参考文献的编排格式如下：",
    referenceFormat: [
      "1、文献是 <strong>期刊</strong> 时，书写格式为：",
      "2、文献是 <strong>图书</strong> 时，书写格式为：",
      "3、文献是 <strong>会议论文集</strong> 时，书写格式为：",
      "4、文献是 <strong>学位论文</strong> 时，书写格式为：",
      "5、文献是来自 <strong>报告</strong> 时，书写格式为：",
      "6、文献是来自 <strong>专利</strong> 时，书写格式为：",
      "7、文献是来自 <strong>国际、国家标准</strong> 时，书写格式为：",
      "8、文献来自 <strong>报纸文章</strong> 时，书写格式为：",
      "9、文献来自 <strong>电子文献</strong> 时，书写格式为："
    ],
    reference: [
      "[序号] 作者. 文章题目[J]. 期刊名, 出版年份，卷号(期数):起止页码.",
      "[序号] 作者. 书名[M]. 版次. 出版地：出版单位，出版年份：起止页码.",
      "[序号] 作者. 文章题目[A].主编.论文集名[C], 出版地：出版单位，出版年份:起止页码.",
      "[序号] 作者. 论文题目[D].保存地：保存单位，年份.",
      "[序号] 报告者. 报告题目[R].报告地：报告会主办单位，报告年份.",
      "[序号] 专利所有者. 专利名称：专利国别，专利号[P].发布日期.",
      "[序号] 标准代号. 标准名称[S].出版地：出版单位，出版年份.",
      "[序号] 作者. 文章题目[N].报纸名，出版日期（版次）.",
      "[序号] 作者.文献题目[电子文献及载体类型标识].电子文献的可获取地址，发表或更新日期/引用日期（可以只选择一项）."
    ],
    referenceList: [],
    electronicReferenceText: "电子参考文献建议标识：",
    electronicReference: [
      "<strong>[DB/OL]</strong>——联机网上数据库(database online)",
      "<strong>[DB/MT]</strong>——磁带数据库(database on magnetic tape)",
      "<strong>[M/CD]</strong>——光盘图书(monograph on CD-ROM)",
      "<strong>[CP/DK]</strong>——磁盘软件(computer program on disk)",
      "<strong>[J/OL]</strong>——网上期刊(serial online)",
      "<strong>[EB/OL]</strong>——网上电子公告(electronic bulletin board online)"
    ],
    electronicReferenceList: [],
    appendix: "论文附录依次用大写字母“附录A、附录B、附录C……”表示，附录内的分级序号可采用“附A1、附A1.1、附A1.1.1”等表示，图、表、公式均依此类推为“图A1、表A1、式A1”等。"
  };

  componentWillMount() {
    this.forTextFormat();
    this.forAbstractAndKeyWords();
    this.forTermsAndLetters();
    this.forSymbolsAndUnits();
    this.forFormula();
    this.forForm();
    this.forIllustration();
    this.forReferenceFormat();
  }

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

  // 循环论文文本格式
  forTextFormat = () => {
    const { textFormat } = this.state;
    const pages = [];
    for (let i = 0, len = textFormat.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={textFormat[i]}>{textFormat[i]}</span>,
      );
    }
    this.setState({
      textFormatList: pages
    })
  };

  // 渲染论文文本格式
  renderTextFormat = () => {
    const { paperFormat, textFormatList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>论文文本格式</Divider>
        <span className={styles.fontMargin}>{paperFormat}</span>
        { textFormatList }
      </div>
    );
  };

  // 渲染目录要求
  renderCatalog = () => {
    const { catalog } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>目录</Divider>
        <span className={styles.fontMargin}>{catalog}</span>
      </div>
    );
  };

  // 循环 摘要与关键词
  forAbstractAndKeyWords = () => {
    const { abstractAndKeyWords } = this.state;
    const pages = [];
    for (let i = 0, len = abstractAndKeyWords.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={abstractAndKeyWords[i]}>{abstractAndKeyWords[i]}</span>,
      );
    }
    this.setState({
      abstractAndKeyWordsList: pages
    })
  };

  // 渲染摘要与关键词格式
  renderAbstractAndKeyWords = () => {
    const { abstractAndKeyWordsList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>摘要与关键词</Divider>
        { abstractAndKeyWordsList }
      </div>
    );
  };

  // 循环 名词术语与字母
  forTermsAndLetters = () => {
    const { termsAndLetters } = this.state;
    const pages = [];
    for (let i = 0, len = termsAndLetters.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={termsAndLetters[i]}>{termsAndLetters[i]}</span>,
      );
    }
    this.setState({
      termsAndLettersList: pages
    })
  };

  // 渲染 名词术语与字母
  renderTermsAndLetters = () => {
    const { termsAndLettersList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>名词术语与字母</Divider>
        { termsAndLettersList }
      </div>
    );
  };

  // 循环 物理量名词、符号与计量单位
  forSymbolsAndUnits = () => {
    const { symbolsAndUnits } = this.state;
    const pages = [];
    for (let i = 0, len = symbolsAndUnits.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={symbolsAndUnits[i]}>{symbolsAndUnits[i]}</span>,
      );
    }
    this.setState({
      symbolsAndUnitsList: pages
    })
  };

  // 渲染 物理量名词、符号与计量单位
  renderSymbolsAndUnits = () => {
    const { symbolsAndUnitsList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>物理量名词、符号与计量单位</Divider>
        { symbolsAndUnitsList }
      </div>
    );
  };

  // 渲染 数字
  renderNumber = () => {
    const { number } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>数字</Divider>
        <span className={styles.fontMargin}>{number}</span>
      </div>
    );
  };

  // 循环 公式
  forFormula = () => {
    const { formula } = this.state;
    const pages = [];
    for (let i = 0, len = formula.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={formula[i]}>{formula[i]}</span>,
      );
    }
    this.setState({
      formulaList: pages
    })
  };

  // 渲染 公式
  renderFormula = () => {
    const { formulaList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>公式</Divider>
        { formulaList }
      </div>
    );
  };

  // 循环 表格
  forForm = () => {
    const { form } = this.state;
    const pages = [];
    for (let i = 0, len = form.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={form[i]}>{form[i]}</span>,
      );
    }
    this.setState({
      formList: pages
    })
  };

  // 渲染 表格
  renderForm = () => {
    const { formList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>表格</Divider>
        { formList }
      </div>
    );
  };

  // 循环 插图
  forIllustration = () => {
    const { illustration } = this.state;
    const pages = [];
    for (let i = 0, len = illustration.length; i < len; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={illustration[i]}>{illustration[i]}</span>,
      );
    }
    this.setState({
      illustrationList: pages
    })
  };

  // 渲染 插图
  renderIllustration = () => {
    const { illustrationList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>插图</Divider>
        { illustrationList }
      </div>
    );
  };

  // 循环 文献格式文字
  forReferenceFormat = () => {
    const { referenceFormat, reference, electronicReference } = this.state;
    const pages = [];
    const pages2 = [];
    for (let i = 0, len1 = referenceFormat.length,len2 = reference.length; i < len1&&len2; i += 1) {
      pages.push(
        <span className={styles.fontMargin} key={referenceFormat[i]} dangerouslySetInnerHTML={{__html: referenceFormat[i]}} />,
        <span className={styles.fontMargin} key={reference[i]}>{reference[i]}</span>
      );
    }
    for (let i = 0, len = electronicReference.length; i < len; i += 1) {
      pages2.push(
        <span className={styles.fontMargin} key={electronicReference[i]} dangerouslySetInnerHTML={{__html: electronicReference[i]}} />,
      );
    }
    this.setState({
      referenceList: pages,
      electronicReferenceList: pages2
    })
  };

  // 渲染 参考文献
  renderReference = () => {
    const { referenceText, referenceList, electronicReferenceText, electronicReferenceList } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>参考文献</Divider>
        <span className={styles.fontMargin}>{referenceText}</span>
        {referenceList}
        <span className={styles.fontMargin}>{electronicReferenceText}</span>
        {electronicReferenceList}
      </div>
    );
  };

  // 渲染 附录
  renderAppendix = () => {
    const { appendix } = this.state;
    return (
      <div className={styles.renderBox}>
        <Divider orientation="left" className={styles.divider}>附录</Divider>
        <span className={styles.fontMargin}>{appendix}</span>
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

            {/* 论文文本格式 */}
            {this.renderTextFormat()}

            {/* 目录 */}
            {this.renderCatalog()}

            {/* 摘要与关键词 */}
            {this.renderAbstractAndKeyWords()}

            {/* 名词术语与字母 */}
            {this.renderTermsAndLetters()}

            {/* 物理量、符号与计量单位 */}
            {this.renderSymbolsAndUnits()}

            {/* 数字 */}
            {this.renderNumber()}

            {/* 公式 */}
            {this.renderFormula()}

            {/* 表格 */}
            {this.renderForm()}

            {/* 插图 */}
            {this.renderIllustration()}

            {/* 参考文献 */}
            {this.renderReference()}

            {/* 附录 */}
            {this.renderAppendix()}

          </div>

        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FormatRequirement;
