import React, { Component } from 'react';
import styles from './ThesisBody.less';
import thesisBody from '../../assets/thesisBody.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class ThesisBody extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="正文详情介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={thesisBody} alt="thesisBody" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default ThesisBody;
