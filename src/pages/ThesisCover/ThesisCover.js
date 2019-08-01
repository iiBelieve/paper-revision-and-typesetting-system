import React, { Component } from 'react';
import styles from './ThesisCover.less';
import thesisCover from '../../assets/thesisCover.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class ThesisCover extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="封面图文介绍">

        <div className={styles.container}>

          {/* CoverExplain */}
          <div className={styles.photoBox}>
            <img src={thesisCover} alt="thesisCover" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default ThesisCover;
