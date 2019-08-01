import React, { Component } from 'react';
import styles from './Thank.less';
import thank from '../../assets/thank.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class Thank extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="致谢图文介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={thank} alt="thank" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default Thank;
