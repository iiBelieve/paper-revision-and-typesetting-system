import React, { Component } from 'react';
import styles from './Reference.less';
import reference from '../../assets/reference.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class Reference extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="参考文献介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={reference} alt="reference" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default Reference;
