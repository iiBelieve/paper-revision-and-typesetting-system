import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { Card, Divider, Drawer, Button, Form, Input, Spin, Empty } from 'antd';
import styles from './EditThesis.less';
import DescriptionList from '@/components/DescriptionList';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';


const { Description } = DescriptionList;

@connect(({ thesisWriting, loading }) => ({
  thesisWriting,
  loading: loading.models.thesisWriting,
}))
@Form.create()
class EditThesis extends Component {

  state = {
    renderThesis: '',
    visible: false,
    renderChatView: [],
    formValues: {},
    loading: false,
    noMessage: '',
    downLoad: '未解析文件',
    downLoadUri: ''
  };

  componentWillMount() {
    this.getStudentInfo();
    this.handleNoMessage();
  }

  componentDidMount = () =>{
    this.getStudentInfo();
    this.handleNoMessage();
  };

  getStudentInfo = () => {
    const { dispatch } = this.props;
    this.setState({
      loading: true,
    }, () => {
      dispatch({
        type: 'thesisWriting/fetch',
        callback: (response) => {
          console.log("response");
          console.log(response);
          dispatch({
            type: 'thesisWriting/getChat',
            payload: response.teacherNum,
            callback: () => {
              this.getRenderHTML();
            },
          });
        }
      });
    });
  };

  getRenderHTML = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'thesisWriting/HTMLget',
      callback: (HTML) => {
        if (HTML === undefined) {
          const render = 'noData';
          this.setState({
            loading: false,
            renderThesis: render
          }, () => {
            this.renderCard();
          })
        } else {
          this.setState({
            loading: false,
            renderThesis: HTML.render
          }, () => {
            this.renderCard();
          })
        }

      }
    });
  };

  handleDownLoad = () => {
    const { dispatch } = this.props;
    const { renderThesis } = this.state;
    this.setState({
      loading: true
    });
    dispatch({
      type: 'thesisWriting/wordDownLoad',
      payload: renderThesis,
      callback: (response) => {
        console.log(response);
        const url = response.message;
        this.setState({
          loading: false,
          downLoadUri: url,
          downLoad: '点击下载',
        }, () => {
          this.renderCard();
        });
      }
    });
  };

  renderCard = () => {

    const {
      thesisWriting: { studentInfo },
    } = this.props;

    const { renderThesis, downLoad, downLoadUri } = this.state;

    return (
      <Card bordered={false} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={1}>

        <DescriptionList size="large" title="学生信息" style={{ marginBottom: 32 }}>

          <Description term="姓名">{studentInfo.studentName}</Description>

          <Description term="学号">{studentInfo.studentNum}</Description>

          <Description term="指导老师">{studentInfo.teacherName}</Description>

          <Description term="联系">

            {
              studentInfo.teacherName === "暂没有选老师" ? studentInfo.teacherName : (
                <Button type="primary" size="small" onClick={() => {this.showDrawer(studentInfo)}}>
                  联系老师
                </Button>
              )
            }

          </Description>

          <Description term="编辑">

            <Button type="primary" size="small">
              <Link to={{ pathname: '/thesisWriting/addThesisFormat'}}>
                编辑论文
              </Link>
            </Button>

          </Description>

          <Description term="解析文件">

            <Button type="primary" size="small" onClick={() => {this.handleDownLoad()}}>
              解析文件
            </Button>

          </Description>

          <Description term="下载文件">

            {
              downLoad === "未解析文件" ? <span>未解析文件</span> : (
                <Button type="primary" size="small">
                  <a href={`/api/lunwen/downLoacDoc/down?path=${downLoadUri}${studentInfo.studentNum}`} target="_blank" rel="noopener noreferrer">{downLoad}</a>
                </Button>
              )
            }
          </Description>

        </DescriptionList>

        <Divider style={{ marginBottom: 32 }} />

        {
          renderThesis !== 'noData' ?

            <div className={styles.thesisBox}>
              <span dangerouslySetInnerHTML={{__html:renderThesis}} />
            </div> :

            <div className={styles.thesisBox}>
              <Empty description={<span>您还没有录入论文，快点开始录入论文吧!</span>}>
                <Button type="primary">
                  <Link to={{ pathname: '/thesisWriting/addThesisFormat'}}>
                    论文录入
                  </Link>
                </Button>
              </Empty>
            </div>
        }

      </Card>
    );
  };

  showDrawer = (studentInfo) => {
    const {
      thesisWriting: { message },
    } = this.props;

    console.log("message");
    console.log(message);

    const str = studentInfo.studentName;
    const str1 = studentInfo.teacherName;
    const stuName = str.substring(1, 3);
    const teaName = str1.substring(1, 3);

    const chat = [];
    const messageList = message.list;
    console.log("messageList");
    console.log(messageList);

    if (messageList === []) {
      chat.unshift(

      )
    }

    for (let i = 0, len = messageList.length; i < len; i += 1) {

      chat.unshift(
        <div className={styles.chatBox} key={i+100}>

          {
            messageList[i].sender.length === 5 ?

              <div>

                <div className={styles.timeBox}>
                  <span>{moment(messageList[i].createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>

                <div className={styles.stuChatMain}>

                  <div className={styles.stuName}>
                    <span>{teaName}</span>
                  </div>

                  <div style={{width:325, display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <span className={styles.stuChatBox}>{messageList[i].text}</span>
                  </div>

                </div>

              </div> :

              <div>

                <div className={styles.timeBox}>
                  <span>{moment(messageList[i].createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>

                <div className={styles.teacherChatMin}>

                  <div style={{width:325, display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <span className={styles.teacherBox}>{messageList[i].text}</span>
                  </div>

                  <div className={styles.teacherName}>
                    <span>{stuName}</span>
                  </div>

                </div>

              </div>
          }

        </div>,
      );

    }

    this.setState({
      visible: true,
      renderChatView:chat,
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

    const { dispatch, form, thesisWriting: { studentInfo }, } = this.props;
    const { formValues } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      values.recipient =  studentInfo.teacherNum;

      console.log('values');
      console.log(values);

      this.setState({
        formValues: values,
      }, () => {
        console.log(formValues);
      });

      dispatch({
        type: 'thesisWriting/sendChat',
        payload: values,
        callback: () => {
          form.resetFields();
          this.setState({
            formValues: {},
          }, () => {
            dispatch({
              type: 'thesisWriting/getChat',
              payload: studentInfo.teacherNum,
              callback: () => {
                this.showDrawer(studentInfo);
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
        bodyStyle={{paddingTop: 10}}
        onClose={this.onClose}
        visible={visible}
      >
        <div style={{ marginBottom: 110, display: 'flex', flexDirection: 'column-reverse' }}>
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

              <Button onClick={this.handleFormReset}>清空</Button>

              <Button htmlType="submit" type="primary">提交</Button>

            </div>

          </Form>

        </div>

      </Drawer>
    );
  };

  render() {

    const { loading } = this.state;

    return (
      <PageHeaderWrapper title="查看论文">

        <Spin tip="正在获取论文，请稍后..." spinning={loading}>

          <div className={styles.container}>

            {this.renderCard()}

            {this.renderChatList()}

          </div>

        </Spin>
      </PageHeaderWrapper>
    );
  }

}

export default EditThesis;
