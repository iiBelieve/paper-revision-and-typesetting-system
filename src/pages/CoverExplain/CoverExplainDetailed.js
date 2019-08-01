import React, { Component } from 'react';
import styles from './CoverExplainDetailed.less';
import CoverExplain from '../../assets/CoverExplain.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class CoverExplainDetailed extends Component {

  state = {};

  renderCoverExplain = () => {
    return (
      <img src={CoverExplain} alt="CoverExplain" />
    );
  };

  render() {

    return (
      <PageHeaderWrapper title="封面说明模版页">

        <div className={styles.container}>

          {/* CoverExplain */}
          <div className={styles.CoverExplain}>{ this.renderCoverExplain() }</div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default CoverExplainDetailed;
