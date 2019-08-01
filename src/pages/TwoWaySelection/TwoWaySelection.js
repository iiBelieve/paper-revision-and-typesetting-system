import React, { Component } from 'react';
import { connect } from 'dva/index';
import { Card, Button, Radio, message } from 'antd';
import styles from './TwoWaySelection.less';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

@connect(({ twoWaySelection, loading }) => ({
  twoWaySelection,
  loading: loading.models.twoWaySelection,
}))
class TwoWaySelection extends Component {

  state = {
    title: '',
    teacher: [],
    student: [],
    teacherNoSelect: '',
    renderGetTeacher: [],
    renderGetStudent: [],
    buttonFlag: null,
    teacherNum: '',
    index: '',
    renderStuSelectRadio: '',
    renderTeacherSelectRadio: '',
    studentSelectMessage: '',
    studentSelectResult: '',
    studentSelectResultFlag: true,
    teacherSelectResult: '',
    teacherSelectResultFlag: null,
    submitButtonFlag: true,
  };

  componentWillMount = () => {
    this.getMyselfInfo();
  };

  componentDidMount = () => {
    this.getMyselfInfo();
  };

  getMyselfInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'twoWaySelection/fetch',
      callback: (response) => {
        if (response.username.length === 12) {
          const value = "学生选择老师";
          this.setState({
            title: value,
            buttonFlag: 1
          }, () => {
            this.getSelectStatus();
            this.studentGetTeacher();
          });
        }
        if (response.username.length === 5) {
          const value = "老师选择学生";
          this.setState({
            title: value,
            buttonFlag: 0,
          }, () => {
           this.teacherGetStudent();
          })
        }
      }
    });
  };

  studentGetTeacher = () => {
    const { dispatch } = this.props;
    const { studentSelectResultFlag } = this.state;
    if (!studentSelectResultFlag) {
      dispatch({
        type: 'twoWaySelection/stuGetTeacher',
        callback: (getAllTeacher) => {
          console.log(getAllTeacher);
          this.setState({
            teacher: getAllTeacher
          }, () => {
            this.renderStudentSelectTeacher();
          })
        }
      });
    }
  };

  teacherGetStudent = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'twoWaySelection/teacherGetStudent',
      callback: (getAllStudent) => {
        console.log(getAllStudent);
        console.log(Array.isArray(getAllStudent));
        if (Array.isArray(getAllStudent)) {
          this.setState({
            student: getAllStudent,
            teacherSelectResultFlag: true,
          }, () => {
            this.renderTeacherSelectStudent()
          })
        } else {
          this.setState({
            teacherNoSelect: getAllStudent,
            teacherSelectResultFlag: false
          }, () => {
            this.renderTeacherSelectResult()
          })
        }
      }
    });
  };

  handleGetTeacherNum = (teacherNum) => {
   this.setState({
     teacherNum
   })
  };

  handleSelectTeacher = () => {
    const { teacherNum } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'twoWaySelection/studentSelectTeacher',
      payload: teacherNum,
      callback: (response) => {
        console.log(response);
        this.getSelectStatus();
        if(response.message === "选择老师成功,请耐心等待老师确认!"){
          message.success("选择老师成功,请耐心等待老师确认!");
        }
      }
    });
  };

  handleGetStudentNum = (index) => {
    this.setState({
      index
    })
  };

  handleAgreeStudent = () => {
    const {student, index} = this.state;
    const { dispatch } = this.props;
    const select = {
      teacherChose: 0,
      studentNum: student[index].studentNum
    };
    console.log(select);
    dispatch({
      type: 'twoWaySelection/teacherSelectStudent',
      payload: select,
      callback: (response) => {
        console.log(response);
        this.teacherGetStudent();
        if (response.message === "选择学生成功") {
          message.success(response.message);
        }
      }
    });
  };

  handleRefuseStudent = () => {
    const {student, index} = this.state;
    const { dispatch } = this.props;
    const select = {
      teacherChose: 1,
      studentNum: student[index].studentNum
    };
    console.log(select);
    dispatch({
      type: 'twoWaySelection/teacherSelectStudent',
      payload: select,
      callback: (response) => {
        console.log(response);
        this.teacherGetStudent();
        if (response === undefined) {
          message.success("成功拒绝绑定该学生");
        }
      }
    });
  };

  getSelectStatus = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'twoWaySelection/studentGetSelectTeacherStatus',
      callback: (response) => {
        this.setState({
          studentSelectMessage: response.message
        }, () => {
          this.setState({
            studentSelectResultFlag: true,
            submitButtonFlag: false,
          }, () => {
            this.renderStudentSelectResult();
          });
        });
      }
    });
  };

  renderTeacherSelectStudent = () => {
    const { student } = this.state;
    const page = [];
    for (let i = 0, len = student.length; i < len; i += 1) {
      page.push(
        <Card.Grid style={{ width: 251, height: 69,textAlign: 'center', }} key={student[i].studentNum}>
          <Radio style={{color: "#1890FF"}} value={i} onChange={() => {this.handleGetStudentNum(i)}}>{student[i].studentName}</Radio>
        </Card.Grid>
      );
    }

    this.setState({
      renderGetStudent: page,
    }, () => {
      this.renderTeacherSelectStudentRadio()
    })

  };

  renderTeacherSelectStudentRadio = () => {
    const { renderGetStudent } = this.state;
    const page = (
      <Radio.Group>
        { renderGetStudent }
      </Radio.Group>
    );
    this.setState({
      renderTeacherSelectRadio: page,
    });
  };

  renderStudentSelectTeacher = () => {
    const { teacher } = this.state;
    const page = [];
    for (let i = 0, len = teacher.length; i < len; i += 1) {
      page.push(
        <Card.Grid style={{ width: 251, height: 69,textAlign: 'center', }} key={teacher[i].teacherNum}>
          <Radio style={{color: "#1890FF"}} value={i} onChange={() => {this.handleGetTeacherNum(teacher[i].teacherNum)}}>{teacher[i].teacherName}</Radio>
        </Card.Grid>
      );
    }

    this.setState({
      renderGetTeacher: page,
    }, () => {
      this.renderStudentSelectTeacherRadio()
    })

  };

  renderStudentSelectTeacherRadio = () => {
    const { renderGetTeacher } = this.state;
    const page = (
      <Radio.Group>
        { renderGetTeacher }
      </Radio.Group>
    );
    this.setState({
      renderStuSelectRadio: page,
    });
  };

  handleStudentSelectResultFlag = () => {
    this.setState({
      studentSelectResultFlag: false,
      submitButtonFlag: true,
    }, () => {
      this.studentGetTeacher();
    });
  };

  renderStudentSelectResult = () => {
    const { studentSelectMessage } = this.state;
    let page = '';

    if (studentSelectMessage === "你还没有选择老师,请尽快作出选择!") {
      page = (
        <div className={styles.studentSelectResultBox}>
          <span style={{ fontSize: 18, color: 'white' }}>{studentSelectMessage}</span>
          <Button style={{ marginTop: 20}} onClick={() => {this.handleStudentSelectResultFlag()}}>选择老师</Button>
        </div>
      );
    }

    if (studentSelectMessage === "请耐心等待老师作出选择") {
      page = (
        <div className={styles.studentSelectResultBox}>
          <span style={{ fontSize: 18, color: 'white' }}>你已经选择了心仪的老师，{studentSelectMessage}</span>
        </div>
      );
    }

    if (studentSelectMessage === "恭喜你选择老师成功") {
      page = (
        <div className={styles.studentSelectResultBox}>
          <span style={{ fontSize: 18, color: 'white' }}>{studentSelectMessage}</span>
        </div>
      );
    }

    if (studentSelectMessage === "很遗憾,你选择的老师没有选择你,请重新作出选择") {
      page = (
        <div className={styles.studentSelectResultBox}>
          <span style={{ fontSize: 18, color: 'white' }}>{studentSelectMessage}</span>
          <Button style={{ marginTop: 20}} onClick={() => {this.handleStudentSelectResultFlag()}}>重新选择老师</Button>
        </div>
      );
    }

    this.setState({
      studentSelectResult: page
    });

  };

  renderTeacherSelectResult = () => {
    const { teacherNoSelect } = this.state;
    const page = (
      <div className={styles.studentSelectResultBox}>
        <span style={{ fontSize: 18, color: 'white' }}>{teacherNoSelect.message}</span>
      </div>
    );

    this.setState({
      teacherSelectResult: page
    });
  };

  render() {

    const {
      title,
      renderStuSelectRadio,
      buttonFlag,
      studentSelectResult,
      studentSelectResultFlag,
      renderTeacherSelectRadio,
      teacherSelectResult,
      teacherSelectResultFlag,
      submitButtonFlag
    } = this.state;

    const content = (
      <div>
        {
          buttonFlag ? (
            <div>
              {
                !submitButtonFlag ? '' : (
                  <Button type="primary" style={{marginRight: 20,marginTop: 10, width: 150}} onClick={() => {this.handleSelectTeacher()}}>提交绑定</Button>
                )
              }
            </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                  teacherSelectResultFlag ? (
                    <div>
                      <Button type="primary" style={{ marginRight: 20, marginTop: 10, width: 150 }} onClick={() => {this.handleAgreeStudent();}}>同意绑定</Button>
                      <Button style={{ marginRight: 20, marginTop: 10, width: 150 }} onClick={() => {this.handleRefuseStudent()}}>拒绝绑定</Button>
                    </div>
                  ) : ''
                }
              </div>
          )
        }

      </div>

    );

    return (
      <PageHeaderWrapper title={title} content={content}>

        <div className={styles.container}>

          <Card style={{ width: '100%', padding: 20}}>
            {
              buttonFlag ? (
                <div>
                  {
                    studentSelectResultFlag ? studentSelectResult : renderStuSelectRadio
                  }
                </div>
              ) : (
                <div>
                  {
                    teacherSelectResultFlag ? renderTeacherSelectRadio : teacherSelectResult
                  }
                </div>
              )
            }
          </Card>



        </div>

      </PageHeaderWrapper>
    );
  }
}

export default TwoWaySelection;
