import React, { Component } from 'react';
import styles from './Appendix.less';
import appendix from '../../assets/appendix.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class Appendix extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="附录图文介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={appendix} alt="appendix" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default Appendix;
