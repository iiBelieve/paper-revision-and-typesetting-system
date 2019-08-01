import React, { Component } from 'react';
import styles from './EnglishAbstract.less';
import englishAbstract from '../../assets/englishAbstract.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class EnglishAbstract extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="英文摘要介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={englishAbstract} alt="englishAbstract" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default EnglishAbstract;
