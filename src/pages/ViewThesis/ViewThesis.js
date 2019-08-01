import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs, Card, Divider, Drawer, Button, Form, Input, Empty, Spin } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import moment from 'moment/moment';
import styles from './ViewThesis.less';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

const { Description } = DescriptionList;

@connect(({ viewThesis, loading }) => ({
  viewThesis,
  loading: loading.effects['viewThesis/fetch'],
}))
@Form.create()
class ViewThesis extends Component {

  state = {
    studentList: [],
    renderThesis: '',
    visible: false,
    renderChatView: [],
    formValues: {},
    studentNumber: '',
    indexNumber: null,
    loading: false,
    noMessage: '',
    empty: '',
    noData: null,
  };

  componentWillMount = () => {
    this.getData();
    this.handleNoMessage();
    this.renderEmpty();
  };

  componentDidMount = () => {
    this.getData();
    this.handleNoMessage();
    this.renderEmpty();
  };

  getData  = () => {
    const { dispatch } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({
      type: 'viewThesis/getStuInfo',
      callback: (response) => {
        console.log(response);
        if (response.guidance.length !== 0) {
          dispatch({
            type: 'viewThesis/fetch',
            payload: response.guidance[0].stuNumber,
            callback: (response1) => {
              this.setState({
                loading: false,
                noData: false,
              }, () => {
                this.getThesis(response1)
              });
            }
          });
        } else {
          this.setState({
            loading: false,
            noData: true
          });
        }
        dispatch({
          type: 'viewThesis/getChat',
          payload: response.guidance[0].stuNumber,
        });
      }
    });
    dispatch({
      type: 'viewThesis/getTeacherMyself',
    });
  };

  renderTabs = () => {
    const { renderThesis } = this.state;

    const {
      viewThesis: { teach },
    } = this.props;
    console.log("teach");
    console.log(teach);
    const studentInfo = teach.guidance;

    const pages = [];
    for (let i = 0, len = studentInfo.length; i < len; i += 1) {
      pages.push(
        <Tabs.TabPane tab={studentInfo[i].stuName} key={i + 1}>
          <Card bordered={false}>
            <DescriptionList size="large" title="学生信息" style={{ marginBottom: 32 }}>
              <Description term="姓名">{studentInfo[i].stuName}</Description>
              <Description term="学号">{studentInfo[i].stuNumber}</Description>
              <Description term="电话">{studentInfo[i].stuPhone}</Description>
              <Description term="专业">{studentInfo[i].stuMajor}</Description>
              <Description term="学院">{studentInfo[i].stuCollege}</Description>
              <Description term="联系">
                <Button type="primary" size="small" onClick={() => {this.showDrawer(i+1)}}>
                  联系学生
                </Button>
              </Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />

            {
              renderThesis ?

                <div className={styles.thesisBox}>
                  <span dangerouslySetInnerHTML={{__html:renderThesis}} />
                </div> :

                <div className={styles.thesisBox}>
                  <Empty description={<span>该学生还没有开始录入论文!</span>} />
                </div>
            }

          </Card>
        </Tabs.TabPane>,
      );
    }
    this.setState({
      studentList: pages
    })
  };

  renderEmpty = () => {
    const page = (
      <div className={styles.thesisBox}>
        <Empty description={<span>您还没有绑定学生!</span>} style={{marginBottom: 20}} />
        <div style={{margin: "0 auto"}}>
          <Button type="primary">
            <Link to={{ pathname: '/twoWaySelection/twoWaySelection'}}>
              绑定学生
            </Link>
          </Button>
        </div>
      </div>
    );
    this.setState({
      empty: page
    })
  };

  getThesis = (thesis) => {
    console.log("thesis");
    console.log(thesis);
    this.setState({
      renderThesis: thesis.render
    }, () => {
      this.renderTabs();
    })
  };

  renderThesis = (key) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'viewThesis/getStuInfo',
      callback: (response) => {
        dispatch({
          type: 'viewThesis/fetch',
          payload: response.guidance[key].stuNumber,
          callback: (response1) => {
            console.log(response1);
            this.getThesis(response1)
          }
        });
        dispatch({
          type: 'viewThesis/getChat',
          payload: response.guidance[key].stuNumber,
        });
      }
    });
  };

  renderHTML = (key) => {

    console.log("进来了renderHTML");

    const {
      viewThesis: { teach },
    } = this.props;

    if (teach) {

      for (let i = 0, len = teach.guidance.length; i < len; i += 1) {

        if (key === `${i + 1}`) {
          console.log(i);
          console.log(`${i + 1}`);
          this.renderThesis(i);
        }

      }

    }

  };

  showDrawer = (index) => {
    console.log(index);
    const page = [];

    const {
      viewThesis: { teach, teacherInfo, message },
    } = this.props;

    const messageList = message.list;
    console.log("messageList");
    console.log(messageList);

    const str2 = teacherInfo.teacherName;
    const teacherName = str2.substring(1,3);

    if (teach) {

      for (let i = 0, len = teach.guidance.length; i < len; i += 1) {

        if (index === (i + 1)) {

          const str = teach.guidance[i].stuName;
          const stuName = str.substring(1,3);
          for (let j = 0, len1 = messageList.length; j < len1; j += 1) {

            page.push(
              <div className={styles.chatBox} key={j+100}>

                {
                  messageList[j].sender.length === 12 ?

                    <div>

                      <div className={styles.timeBox}>
                        <span>{moment(messageList[j].createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                      </div>

                      <div className={styles.stuChatMain}>

                        <div className={styles.stuName}>
                          <span>{stuName}</span>
                        </div>

                        <div style={{width:325, display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                          <span className={styles.stuChatBox}>{messageList[j].text}</span>
                        </div>

                      </div>

                    </div> :

                    <div>

                      <div className={styles.timeBox}>
                        <span>{moment(messageList[j].createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                      </div>

                      <div className={styles.teacherChatMin}>

                        <div style={{width:325, display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                          <span className={styles.teacherBox}>{messageList[j].text}</span>
                        </div>

                        <div className={styles.teacherName}>
                          <span>{teacherName}</span>
                        </div>

                      </div>

                    </div>
                }

              </div>,
            );

          }

        }

      }

    }

    const Num = teach.guidance[index - 1].stuNumber;

    this.setState({
      visible: true,
      renderChatView: page,
      studentNumber: Num,
      indexNumber: index,
    }, () => {
      this.renderChatList();
    });

  };

  onClose = () => {
    this.setState({
      visible: false,
    }, () => {
      this.renderChatList();
    });
  };

  // post 表单数据
  handleChat = e => {
    e.preventDefault();

    const { form, dispatch } = this.props;
    const { formValues, studentNumber, indexNumber } = this.state;

    console.log(studentNumber);
    console.log(indexNumber);

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      values.recipient =  studentNumber;

      console.log('values');
      console.log(values);

      this.setState({
        formValues: values,
      }, () => {
        console.log(formValues);
      });

      dispatch({
        type: 'viewThesis/sendChat',
        payload: values,
        callback: () => {
          form.resetFields();
          this.setState({
            formValues: {},
          }, () => {
            dispatch({
              type: 'viewThesis/getChat',
              payload: studentNumber,
              callback: () => {
                this.showDrawer(indexNumber);
              }
            });

          });
        },
      });

    });
  };

  // 重置表单数据
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  handleNoMessage = () => {
    const page = (
      <div style={{display: "flex", flex: 1, justifyContent: 'center', marginTop: 20}}>
        <span style={{fontSize: 12}}>您还没开始聊天，请输入您想说的话并提交，就可以愉快的聊天了</span>
      </div>
    );
    this.setState({
      noMessage: page,
    });
  };

  renderChatList = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, renderChatView, noMessage } = this.state;
    return (
      <Drawer
        width={420}
        closable={false}
        onClose={this.onClose}
        bodyStyle={{paddingTop: 10}}
        visible={visible}
      >
        <div className={styles.renderChatView}>
          {
            renderChatView.length === 0 ? noMessage : renderChatView
          }
        </div>

        {/* 提交按钮 */}
        <div className={styles.chatButton}>

          <Form onSubmit={this.handleChat}>

            <Form.Item style={{marginBottom:12}}>
              {
                getFieldDecorator('text')
                (<Input />)
              }
            </Form.Item>

            <div className={styles.button}>

              <Button onClick={this.handleFormReset}>
                清空
              </Button>

              <Button htmlType="submit" type="primary">
                提交
              </Button>

            </div>

          </Form>

        </div>

      </Drawer>
    );
  };

  render() {

    const { studentList, loading, noData, empty } = this.state;

    console.log(studentList);

    return (
      <PageHeaderWrapper title="查看论文">

        <Spin tip="正在获取论文，请稍后..." spinning={loading}>

          <div className={styles.container}>

            {
              noData ? empty : (
                <Tabs defaultActiveKey="1" onChange={this.renderHTML} style={{ flex: 1 }}>
                  {studentList}
                </Tabs>
              )
            }

            {this.renderChatList()}

          </div>

        </Spin>

      </PageHeaderWrapper>
    );
  }

}

export default ViewThesis;
