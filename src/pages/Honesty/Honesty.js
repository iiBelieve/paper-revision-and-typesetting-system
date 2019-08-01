import React, { Component } from 'react';
import styles from './Honesty.less';
import academicHonestyExplanation from '../../assets/academicHonestyExplanation.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class Honesty extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="学术诚信介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={academicHonestyExplanation} alt="academicHonestyExplanation" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default Honesty;
