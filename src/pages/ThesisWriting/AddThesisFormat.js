import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {Button, Card, Modal, Input, Form, Spin, message, Empty } from 'antd';
import  styles from './AddThesisFormat.less';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';


const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ addThesisFormat, loading }) => ({
  addThesisFormat,
  loading: loading.models.addThesisFormat,
}))
@Form.create()
class AddThesisFormat extends PureComponent {

  state = {
    visible: false,
    loading: false,
    buttonList: ["论文中文题目","中文摘要", "中文关键字", "一级标题", "追加一级标题内容", "二级标题","追加二级标题内容", "三级标题","追加三级标题内容", "参考文献", "论文英文题目", "英文摘要", "英文关键字"],
    buttonRender: [],
    spanTip: '正在获取论文，请稍后...',
    modelTitle: '',
    index: null,
    empty: "　　",

    // 论文中文题目
    formTitle: {},
    renderFormTitle: [],
    // 中文摘要
    formCnAbstract: {},
    renderFormCnAbstract: '',
    // 中文关键字
    formCnKeyWords: {
      cnKeyWords: ''
    },
    renderFormCnKeyWords: '',
    renderFormCnKeyWordsItem: '',
    // 正文标题
    firstTitle: [],
    secondTitle: [],
    thirdTitle: [],
    renderTitleAndContent: [],
    // 参考文献
    formReference: [],
    renderFormReferenceItem: [],
    renderFormReference:[],
    // 英文标题
    formEgTitle: {},
    renderEgFormTitle: [],
    // 英文文摘要
    formEgAbstract: {},
    renderFormEgAbstract: '',
    // 英文关键字
    formEgKeyWords: {
      egKeyWords: ''
    },
    renderFormEgKeyWords: '',
    renderFormEgKeyWordsItem: '',

    // 修改论文中文题目
    cnTitle: '',
    // 修改论文英文题
    EgTitle: '',
    // 修改中文摘要
    CnAbstractContent: '',
    // 修改中文关键字
    CnKeyWordsItem: '',

    // 修改英文摘要
    EgAbstractContent: '',
    // 修改英文关键字
    EgKeyWordsItem: '',

    // 修改一级标题，
    firstFlagChange: '',
    firstTitleChange: '',
    // 修改一级标题下的某段内容
    firstTitleContentListItem: '',

    // 修改二级标题，
    secondFlagChange: '',
    secondTitleChange: '',
    // 修改二级标题下的某段内容
    secondTitleContentListItem: '',

    // 修改三级标题，
    thirdFlagChange: '',
    thirdTitleChange: '',
    // 修改三级标题下的某段内容
    thirdTitleContentListItem: '',

    // 修改参考文献
    referenceChangeItem: '',

    thesis: [], // 渲染整篇文章的
    thesisHTML: '', // 发送给后台的HTML

  };

  componentWillMount = () => {
    this.renderButton();
    this.getThesisTitle();
  };

  componentDidMount = () => {
    this.renderButton();
    this.getThesisTitle();
  };

  getThesisTitle = () => {
    const { dispatch } = this.props;
    this.setState({
      loading: true,
    }, () => {
      dispatch({
        type: 'addThesisFormat/getThesisCnTitle',
        callback: (cnTitle) => {
          if (cnTitle) {
            this.setState({
              formTitle: cnTitle,
            }, () => {
              this.renderThesisTitle();
              this.getCnAbstract();
            });
          } else {
            this.setState({
              loading: false
            })
          }
        },
      });
    });

  };

  getCnAbstract = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisCnAbstract',
      callback: (cnAbstract) => {
        if (cnAbstract) {
          this.setState({
            formCnAbstract: cnAbstract,
          }, () => {
            this.renderThesisCnAbstract();
            this.getCnKeyWords();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getCnKeyWords = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisCnKeyWords',
      callback: (cnKeyWords) => {
       if (cnKeyWords){
         this.setState({
           formCnKeyWords: cnKeyWords,
         }, () => {
           this.renderThesisCnKeyWordsItem();
           this.getFirstTitle();
         })
       } else {
         this.setState({
           loading: false
         })
       }
      }
    });
  };

  getFirstTitle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisFirst',
      callback: (bodyFirst) => {
        if (bodyFirst) {
          this.setState({
            firstTitle: bodyFirst.first,
          }, () => {
            this.renderThesisBody();
            this.getSecondTitle();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getSecondTitle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisSecond',
      callback: (bodySecond) => {
        if (bodySecond) {
          this.setState({
            secondTitle: bodySecond.second,
          }, () => {
            this.renderThesisBody();
            this.getThirdTitle();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getThirdTitle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisThird',
      callback: (bodyThird) => {
        if (bodyThird) {
          this.setState({
            thirdTitle: bodyThird.third,
          }, () => {
            this.renderThesisBody();
            this.getReference();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getReference = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisReference',
      callback: (reference) => {
        if (reference) {
          this.setState({
            formReference: reference.formReference,
          }, () => {
            this.renderReferenceItem();
            this.getEgTitle();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getEgTitle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisEgTitle',
      callback: (egTitle) => {
        if (egTitle) {
          this.setState({
            formEgTitle: egTitle,
          }, () => {
            this.renderThesisEgTitle();
            this.getEgAbstract();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getEgAbstract = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisEgAbstract',
      callback: (egAbstract) => {
        if (egAbstract) {
          this.setState({
            formEgAbstract: egAbstract,
          }, () => {
            this.renderThesisEgAbstract();
            this.getEgKeyWords()
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  getEgKeyWords = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'addThesisFormat/getThesisEgKeyWords',
      callback: (egKeyWords) => {
        if (egKeyWords){
          this.setState({
            formEgKeyWords: egKeyWords,
            loading: false,
          }, () => {
            this.renderThesisEgKeyWordsItem();
            this.getFirstTitle();
          })
        } else {
          this.setState({
            loading: false
          })
        }
      }
    });
  };

  showModal = (i) => {
    const { buttonList } = this.state;
    this.setState({
      visible: true,
      modelTitle: buttonList[i],
      index: i
    });
  };

  handleOk = () => {
    const { form } = this.props;
    const { index, buttonList } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log("fieldsValue");
      console.log(fieldsValue);
      console.log("buttonList[index]");
      console.log(buttonList[index]);

      // 论文中文题目
      if (buttonList[index] === "论文中文题目") {
        this.setState({
          formTitle: fieldsValue,
          spanTip: '正在提交论文题目，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const { formTitle } = this.state;
          dispatch({
            type: 'addThesisFormat/thesisCnTitle',
            payload: formTitle,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文中文题目!");
                this.renderThesisTitle();
              });
            },
          });
        })
      }

      // 中文摘要
      if (buttonList[index] === '中文摘要') {
        const cnAbstract = {};
        cnAbstract.text = '摘　要：';
        cnAbstract.cnAbstract = fieldsValue.cnAbstract;
        this.setState({
          formCnAbstract: cnAbstract,
          spanTip: '正在提交论文中文摘要，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const { formCnAbstract } = this.state;
          dispatch({
            type: 'addThesisFormat/thesisCnAbstract',
            payload: formCnAbstract,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文中文摘要!");
                this.renderThesisCnAbstract();
              });
            },
          });
        });
      }

      // 中文关键字
      if (buttonList[index] === '中文关键字') {
        this.setState({
          formCnKeyWords: fieldsValue,
          spanTip: '正在提交论文中文关键字，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const { formCnKeyWords } = this.state;
          dispatch({
            type: 'addThesisFormat/thesisCnKeyWords',
            payload: formCnKeyWords,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文中文关键字!");
                this.renderThesisCnKeyWordsItem();
              });
            },
          });
        })
      }

      // 一级标题
      if (buttonList[index] === '一级标题') {
        const { firstTitle, empty } = this.state;
        const value = {};
        const firstContent = [];
        if (fieldsValue.firstTitleContent !== undefined) {
          const val = `${empty}${fieldsValue.firstTitleContent}`;
          firstContent.push(val);
        } else {
          firstContent.push(fieldsValue.firstTitleContent);
        }

        value.firstTitle = fieldsValue.firstTitle;
        value.firstTitleContent = firstContent;
        value.firstTitleFlag = fieldsValue.firstTitleFlag;

        firstTitle.push(value);

        this.setState({
          firstTitle,
          spanTip: '正在提交论文一级标题，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            first: []
          };
          val.first = firstTitle;
          dispatch({
            type: 'addThesisFormat/thesisFirst',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文一级标题!");
                this.renderThesisBody();
              });
            },
          });
        });

      }

      // 追加一级标题内容
      if (buttonList[index] === '追加一级标题内容') {
        const { firstTitle, empty } = this.state;
        for (let i = 0, len = firstTitle.length; i < len; i += 1) {
          if (Number(firstTitle[i].firstTitleFlag) === Number(fieldsValue.firstTitleFlag) && firstTitle[i].firstTitleContent !== undefined) {
            const val = `${empty}${fieldsValue.firstTitleContent}`;
            firstTitle[i].firstTitleContent.push(val);
          }
        }
        this.setState({
          firstTitle,
          spanTip: '正在提交追加后的一级标题内容，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            first: []
          };
          val.first = firstTitle;
          dispatch({
            type: 'addThesisFormat/thesisFirst',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("追加一级标题内容成功!");
                this.renderThesisBody();
              });
            },
          });
        });
      }

      // 二级标题
      if (buttonList[index] === '二级标题') {
        const { secondTitle, empty } = this.state;
        const value = {};
        const firstContent = [];
        if (fieldsValue.secondTitleContent !== undefined) {
          const val = `${empty}${fieldsValue.secondTitleContent}`;
          firstContent.push(val);
        } else {
          firstContent.push(fieldsValue.secondTitleContent);
        }

        value.secondTitle = fieldsValue.secondTitle;
        value.secondTitleContent = firstContent;
        value.secondTitleFlag = fieldsValue.secondTitleFlag;

        secondTitle.push(value);

        this.setState({
          secondTitle,
          spanTip: '正在提交论文二级标题，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            second: []
          };
          val.second = secondTitle;
          dispatch({
            type: 'addThesisFormat/thesisSecond',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文二级标题!");
                this.renderThesisBody();
              });
            },
          });
        });

      }

      // 追加二级标题内容
      if (buttonList[index] === '追加二级标题内容') {
        const { secondTitle, empty } = this.state;
        for (let i = 0, len = secondTitle.length; i < len; i += 1) {
          const str = secondTitle[i].secondTitleFlag.split(".");
          const str1 = fieldsValue.secondTitleFlag.split(".");
          if (str[0] === str1[0] && str[1] === str1[1] ) {
            const val = `${empty}${fieldsValue.secondTitleContent}`;
            secondTitle[i].secondTitleContent.push(val);
          }
        }
        this.setState({
          secondTitle,
          spanTip: '正在提交追加后的二级标题内容，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            second: []
          };
          val.second = secondTitle;
          dispatch({
            type: 'addThesisFormat/thesisSecond',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("追加二级标题内容成功!");
                this.renderThesisBody();
              });
            },
          });
        });
      }

      // 三级标题
      if (buttonList[index] === '三级标题') {
        const { thirdTitle, empty } = this.state;
        const value = {};
        const firstContent = [];
        if (fieldsValue.thirdTitleContent !== undefined) {
          const val = `${empty}${fieldsValue.thirdTitleContent}`;
          firstContent.push(val);
        } else {
          firstContent.push(fieldsValue.thirdTitleContent);
        }

        value.thirdTitle = fieldsValue.thirdTitle;
        value.thirdTitleContent = firstContent;
        value.thirdTitleFlag = fieldsValue.thirdTitleFlag;

        thirdTitle.push(value);

        this.setState({
          thirdTitle,
          spanTip: '正在提交论文三级标题，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            third: []
          };
          val.third = thirdTitle;
          dispatch({
            type: 'addThesisFormat/thesisThird',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文三级标题!");
                this.renderThesisBody();
              });
            },
          });
        });

      }

      // 追加三级标题内容
      if (buttonList[index] === '追加三级标题内容') {
        const { thirdTitle, empty } = this.state;
        for (let i = 0, len = thirdTitle.length; i < len; i += 1) {
          const str = thirdTitle[i].thirdTitleFlag.split(".");
          const str1 = fieldsValue.thirdTitleFlag.split(".");
          if (str[0] === str1[0] && str[1] === str1[1] && str[2] === str1[2]) {
            const val = `${empty}${fieldsValue.thirdTitleContent}`;
            thirdTitle[i].thirdTitleContent.push(val);
          }
        }
        this.setState({
          thirdTitle,
          spanTip: '正在提交追加后的三级标题内容，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            third: []
          };
          val.third = thirdTitle;
          dispatch({
            type: 'addThesisFormat/thesisThird',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("追加三级标题内容成功!");
                this.renderThesisBody();
              });
            },
          });
        });
      }

      // 参考文献
      if (buttonList[index] === '参考文献') {
        const { formReference } = this.state;
        const str9 = fieldsValue.reference.replace(/\s+/g,"");
        const str = str9.replace(/；/g,";");
        const str1 = str.replace(/，/g,",");
        const str2 = str1.replace(/。/g,".");
        const str3 = str2.replace(/：/g,":");
        const str4 = str3.replace(/,/g,",我是空格");
        const str5 = str4.replace(/\./g,".我是空格");
        const str6 = str5.replace(/:/g,":我是空格");
        const str7 = str6.replace(/;/g,";我是空格");
        const str8 = str7.replace(/我是空格/g," ");

        formReference.push(str8);

        this.setState({
          formReference,
          spanTip: '正在提交论文参考文献，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const val = {
            formReference: []
          };
          val.formReference = formReference;
          dispatch({
            type: 'addThesisFormat/thesisReference',
            payload: val,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文参考文献!");
                this.renderReferenceItem();
              });
            },
          });
        });
      }

      // 论文英文题目
      if (buttonList[index] === "论文英文题目") {
        this.setState({
          formEgTitle: fieldsValue,
          spanTip: '正在提交论文英文题目，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const { formEgTitle } = this.state;
          dispatch({
            type: 'addThesisFormat/thesisEgTitle',
            payload: formEgTitle,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文英文题目!");
                this.renderThesisEgTitle();
              });
            },
          });
        })
      }

      // 英文摘要
      if (buttonList[index] === '英文摘要') {
        const egAbstract = {};
        egAbstract.text = 'Abstract:';
        egAbstract.egAbstract = fieldsValue.egAbstract;
        this.setState({
          formEgAbstract: egAbstract,
          spanTip: '正在提交论文英文摘要，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const { formEgAbstract } = this.state;
          dispatch({
            type: 'addThesisFormat/thesisEgAbstract',
            payload: formEgAbstract,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文英文摘要!");
                this.renderThesisEgAbstract();
              });
            },
          });
        });
      }

      // 英文关键字
      if (buttonList[index] === '英文关键字') {
        this.setState({
          formEgKeyWords: fieldsValue,
          spanTip: '正在提交论文英文关键字，请稍后...',
          loading: true,
        }, () => {
          const { dispatch } = this.props;
          const { formEgKeyWords } = this.state;
          dispatch({
            type: 'addThesisFormat/thesisEgKeyWords',
            payload: formEgKeyWords,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                message.success("成功创建论文英文关键字!");
                this.renderThesisEgKeyWordsItem();
              });
            },
          });
        })
      }

    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  renderButton = () => {
    const { buttonList } = this.state;
    const page = [];
    for (let i = 0, len = buttonList.length; i < len; i += 1) {
      page.push(
        <Button
          type="primary"
          style={{marginRight: 20,marginTop: 10, width: 150}}
          onClick={() => {this.showModal(i)}}
          key={buttonList[i]}
        >
          {buttonList[i]}
        </Button>
      );
    }

    this.setState({
      buttonRender: page,
    })

  };

  // 论文中文题目
  renderThesisTitle = () => {
    const { formTitle} = this.state;
    if (formTitle) {
      const page = (
        <p style={{ textIndent: '0pt', textAlign: 'center', marginTop: '30.0pt', marginBottom: '30.0pt' }} onClick={(e) => {this.handleChangeTitle(e)}}>
          <span style={{ fontFamily: '黑体', fontSize: '18.0pt', fontWeight: 'bold', color: '#000' }}>{formTitle.title}</span>
        </p>
      );
      this.setState({
        renderFormTitle: page,
      }, () => {
        this.renderThesis()
      })
    }
  };

  // 论文英文题目
  renderThesisEgTitle = () => {
    const { formEgTitle} = this.state;
    if (formEgTitle) {
      const page = (
        <p style={{ textIndent: '0pt', textAlign: 'center', marginTop: '30.0pt', marginBottom: '30.0pt' }} onClick={(e) => {this.handleChangeEgTitle(e)}}>
          <span style={{ fontFamily: 'Times New Roman', fontSize: '18.0pt', fontWeight: 'bold', color: '#000' }}>{formEgTitle.egTitle}</span>
        </p>
      );
      this.setState({
        renderEgFormTitle: page,
      }, () => {
        this.renderThesis()
      })
    }
  };

  // 修改论文标题
  handleChangeTitle = (e) => {
    const { formTitle } = this.state;
    const bigTitle = formTitle.title;
    Modal.confirm({
      title: '修改论文标题',
      width: 900,
      content: (
        <Input
          defaultValue={bigTitle}
          onChange={(val) => {
            this.setState({
              cnTitle : val.target.value,
            });
          }}
        />
      ),
      onOk: () => {
        const { cnTitle } = this.state;
        formTitle.title = cnTitle;
        this.setState({
          formTitle
        }, () => {
          const { dispatch } = this.props;
          this.setState({
            spanTip: '正在提交修改后的论文题目，请稍后...',
            loading: true,
          }, () => {
            dispatch({
              type: 'addThesisFormat/thesisCnTitle',
              payload: formTitle,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisCnTitle',
                  callback: (response) => {
                    this.setState({
                      formTitle: response,
                      loading: false,
                    }, () => {
                      message.success("论文中文题目修改成功");
                      this.renderThesisTitle();
                    });
                  },
                });
              },
            });
          });
        });
        this.renderThesisTitle()
      },
      onCancel() {},
    });
    e.stopPropagation();
  };

  // 修改论文英文标题
  handleChangeEgTitle = (e) => {
    const { formEgTitle } = this.state;
    const bigTitle = formEgTitle.egTitle;
    Modal.confirm({
      title: '修改论文英文题目',
      width: 900,
      content: (
        <Input
          defaultValue={bigTitle}
          onChange={(val) => {
            this.setState({
              EgTitle : val.target.value,
            });
          }}
        />
      ),
      onOk: () => {
        const { EgTitle } = this.state;
        formEgTitle.egTitle = EgTitle;
        this.setState({
          formEgTitle
        }, () => {
          const { dispatch } = this.props;
          this.setState({
            spanTip: '正在提交修改后的论文英文题目，请稍后...',
            loading: true,
          }, () => {
            dispatch({
              type: 'addThesisFormat/thesisEgTitle',
              payload: formEgTitle,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisEgTitle',
                  callback: (response) => {
                    this.setState({
                      formEgTitle: response,
                      loading: false,
                    }, () => {
                      message.success("论文英文题目修改成功");
                      this.renderThesisEgTitle();
                    });
                  },
                });
              },
            });
          });
        });
      },
      onCancel() {},
    });
    e.stopPropagation();
  };

  // 中文摘要
  renderThesisCnAbstract = () => {
    const { formCnAbstract } = this.state;
    if (formCnAbstract) {
      const page = (
        <p style={{ textIndent: '0pt', textAlign: 'left',margin: 0, lineHeight: "20.0pt",}}>
          <span style={{ fontFamily: '黑体', fontSize: '12.0pt', fontWeight: 'bold', color: '#000', lineHeight: "20.0pt"}}>{formCnAbstract.text}</span>
          <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt', lineHeight: "20.0pt", color: '#000' }} onClick={(e) => {this.handleChangeCnAbstract(e)}}>{formCnAbstract.cnAbstract}</span>
        </p>
      );
      this.setState({
        renderFormCnAbstract: page,
      }, () => {
        this.renderThesis()
      })
    }
  };

  // 英文摘要
  renderThesisEgAbstract = () => {
    const { formEgAbstract } = this.state;
    if (formEgAbstract) {
      const page = (
        <p style={{ textIndent: '0pt', textAlign: 'left',margin: 0, lineHeight: "20.0pt"}}>
          <span style={{ fontFamily: 'Times New Roman', fontSize: '12.0pt', fontWeight: 'bold', color: '#000',lineHeight: "20.0pt" }}>{formEgAbstract.text}&nbsp;</span>
          <span style={{ fontFamily: 'Times New Roman', fontSize: '12.0pt', lineHeight: "20.0pt", color: '#000' }} onClick={(e) => {this.handleChangeEgAbstract(e)}}>{formEgAbstract.egAbstract}</span>
        </p>
      );
      this.setState({
        renderFormEgAbstract: page,
      }, () => {
        this.renderThesis()
      })
    }
  };

  // 修改中文摘要
  handleChangeCnAbstract = (e) => {
    const { formCnAbstract } = this.state;
    const abstractContent = formCnAbstract.cnAbstract;
    Modal.confirm({
      title: '修改中文摘要',
      width: 900,
      content: (
        <TextArea
          type="textarea"
          rows={10}
          defaultValue={abstractContent}
          onChange={(val) => {
            this.setState({
              CnAbstractContent : val.target.value,
            });
          }}
        />
      ),
      onOk: () => {
        const { CnAbstractContent } = this.state;
        formCnAbstract.cnAbstract = CnAbstractContent;
        this.setState({
          formCnAbstract,
          spanTip: '正在提交修改后的论文中文摘要，请稍后...',
        }, () => {
          const { dispatch } = this.props;
          dispatch({
            type: 'addThesisFormat/thesisCnAbstract',
            payload: formCnAbstract,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                dispatch({
                  type: 'addThesisFormat/getThesisCnAbstract',
                  callback: (cnAbstract) => {
                    this.setState({
                      formCnAbstract: cnAbstract,
                      loading: false,
                    }, () => {
                      message.success("论文中文摘要修改成功");
                      this.renderThesisCnAbstract();
                    })
                  }
                });
              });
            },
          });
        })
      },
      onCancel() {},
    });
    e.stopPropagation();
  };

  // 修改英文摘要
  handleChangeEgAbstract = (e) => {
    const { formEgAbstract } = this.state;
    const abstractContent = formEgAbstract.egAbstract;
    Modal.confirm({
      title: '修改中文摘要',
      width: 900,
      content: (
        <TextArea
          type="textarea"
          rows={10}
          defaultValue={abstractContent}
          onChange={(val) => {
            this.setState({
              EgAbstractContent : val.target.value,
            });
          }}
        />
      ),
      onOk: () => {
        const { EgAbstractContent } = this.state;
        formEgAbstract.egAbstract = EgAbstractContent;
        this.setState({
          formEgAbstract,
          spanTip: '正在提交修改后的论文英文摘要，请稍后...',
        }, () => {
          const { dispatch } = this.props;
          dispatch({
            type: 'addThesisFormat/thesisEgAbstract',
            payload: formEgAbstract,
            callback: () => {
              this.setState({
                loading: false,
              }, () => {
                dispatch({
                  type: 'addThesisFormat/getThesisEgAbstract',
                  callback: (egAbstract) => {
                    this.setState({
                      formEgAbstract: egAbstract,
                      loading: false,
                    }, () => {
                      message.success("论文英文摘要修改成功");
                      this.renderThesisEgAbstract();
                    })
                  }
                });
              });
            },
          });
        })
      },
      onCancel() {},
    });
    e.stopPropagation();
  };

  // 渲染中文关键字
  renderThesisCnKeyWordsItem = () => {
    const { formCnKeyWords } = this.state;
    if(formCnKeyWords) {
      const page = (
        <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt', color: '#000', lineHeight: "20.0pt"}} onClick={() => {this.handleChangeCnKeyWordsItem()}}>{formCnKeyWords.cnKeyWords}</span>
      );
      this.setState({
        renderFormCnKeyWordsItem: page,
      }, () => {
        this.renderThesisCnKeyWords();
      })
    }

  };

  // 渲染拼接中文关键字
  renderThesisCnKeyWords = () => {
    const { renderFormCnKeyWordsItem } = this.state;
    const page = (
      <p style={{ textIndent: '0pt', textAlign: 'left', margin: 0, lineHeight: "20.0pt"}}>
        <span style={{ fontFamily: '黑体', fontSize: '12.0pt', fontWeight: 'bold', color: '#000', lineHeight: "20.0pt"}}>关键字：</span>
        { renderFormCnKeyWordsItem }
      </p>
    );
    this.setState({
      renderFormCnKeyWords: page,
    }, () => {
      this.renderThesis();
    });
  };

  // 渲染英文关键字
  renderThesisEgKeyWordsItem = () => {
    const { formEgKeyWords } = this.state;
    if(formEgKeyWords) {
      const page = (
        <span style={{ fontFamily: 'Times New Roman', fontSize: '12.0pt', color: '#000',lineHeight: "20.0pt" }} onClick={() => {this.handleChangeEgKeyWordsItem()}}>{formEgKeyWords.egKeyWords}</span>
      );
      this.setState({
        renderFormEgKeyWordsItem: page,
      }, () => {
        this.renderThesisEgKeyWords();
      })
    }
  };

  // 渲染拼接英文关键字
  renderThesisEgKeyWords = () => {
    const { renderFormEgKeyWordsItem } = this.state;
    const page = (
      <p style={{ textIndent: '0pt', textAlign: 'left', margin: 0, lineHeight: "20.0pt"}}>
        <span style={{ fontFamily: 'Times New Roman', fontSize: '12.0pt', fontWeight: 'bold', color: '#000', lineHeight: "20.0pt"}}>Keywords:&nbsp;</span>
        { renderFormEgKeyWordsItem }
        <br />
        <br />
      </p>
    );
    this.setState({
      renderFormEgKeyWords: page,
    }, () => {
      this.renderThesis();
    });
  };

  // 修改中文关键字
  handleChangeCnKeyWordsItem = () => {
    const { formCnKeyWords } = this.state;
    const cnKey = formCnKeyWords.cnKeyWords;
    this.setState({
      CnKeyWordsItem: cnKey,
    }, () => {
      Modal.confirm({
        title: '修改论文中文关键词',
        width: 900,
        content: (
          <Input
            defaultValue={cnKey}
            onChange={(val) => {
              this.setState({
                CnKeyWordsItem : val.target.value,
              });
            }}
          />
        ),
        onOk: () => {
          const { CnKeyWordsItem } = this.state;
          formCnKeyWords.cnKeyWords = CnKeyWordsItem;
          this.setState({
            formCnKeyWords,
            spanTip: '正在提交修改后的论文中文关键字，请稍后...',
          }, () => {
            const { dispatch } = this.props;
            dispatch({
              type: 'addThesisFormat/thesisCnKeyWords',
              payload: formCnKeyWords,
              callback: () => {
                this.setState({
                  loading: false,
                }, () => {
                  dispatch({
                    type: 'addThesisFormat/getThesisCnKeyWords',
                    callback: (cnKeyWords) => {
                      this.setState({
                        formCnKeyWords: cnKeyWords,
                        loading: false,
                      }, () => {
                        message.success("论文中文关键字修改成功");
                        this.renderThesisCnKeyWordsItem();
                      })
                    }
                  });
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 修改英文关键字
  handleChangeEgKeyWordsItem = () => {
    const { formEgKeyWords } = this.state;
    const egKey = formEgKeyWords.egKeyWords;
    this.setState({
      EgKeyWordsItem: egKey,
    }, () => {
      Modal.confirm({
        title: '修改论文英文关键词',
        width: 900,
        content: (
          <Input
            defaultValue={egKey}
            onChange={(val) => {
              this.setState({
                EgKeyWordsItem : val.target.value,
              });
            }}
          />
        ),
        onOk: () => {
          const { EgKeyWordsItem } = this.state;
          formEgKeyWords.egKeyWords = EgKeyWordsItem;
          this.setState({
            formEgKeyWords,
            spanTip: '正在提交修改后的论文英文关键字，请稍后...',
          }, () => {
            const { dispatch } = this.props;
            dispatch({
              type: 'addThesisFormat/thesisEgKeyWords',
              payload: formEgKeyWords,
              callback: () => {
                this.setState({
                  loading: false,
                }, () => {
                  dispatch({
                    type: 'addThesisFormat/getThesisEgKeyWords',
                    callback: (egKeyWords) => {
                      this.setState({
                        formEgKeyWords: egKeyWords,
                        loading: false,
                      }, () => {
                        message.success("论文英文关键字修改成功");
                        this.renderThesisEgKeyWordsItem();
                      })
                    }
                  });
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  destroyAll = () => {
    Modal.destroyAll();
  };

  //  渲染正文
  renderThesisBody = () => {
    const { firstTitle, secondTitle, thirdTitle } = this.state;
    const page = [];

    if (firstTitle.length > 1 ) {
      firstTitle.sort(this.ascendFirst);
    }
    if(secondTitle.length > 1) {
      secondTitle.sort(this.ascendSecond);
    }
    if (thirdTitle.length > 1) {
      thirdTitle.sort(this.ascendThird);
    }

    if (firstTitle.length !== 0) {
      for (let i = 0, len = firstTitle.length; i < len; i += 1) {
        const fir=Number(firstTitle[i].firstTitleFlag);

        const firstContent = firstTitle[i].firstTitleContent;
        const contentPage = [];
        if (firstContent) {
          for (let q = 0, le1 = firstContent.length; q < le1; q += 1) {
            contentPage.push(
              <p style={{margin: 0, lineHeight: "20.0pt"}} key={q+99}>
                {
                  firstContent[q] === undefined  ? '' : (
                    <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: "20.0pt"}} onClick={() => {this.handleChangeFirstContent(i, q)}}>
                      {firstContent[q]}
                    </span>
                  )
                }
              </p>
            );
          }
        }

        page.push(
          <div key={firstTitle[i].firstTitleFlag}>
            <p style={{ marginTop: '24.0pt', marginBottom: '24.0pt', lineHeight: '20.0pt' }}>
              <span style={{ fontFamily: 'SimHei', fontSize: '14.0pt', color: '#000', lineHeight: '20.0pt' }} onClick={() => {this.handleChangeFirstTitle(i)}}>
                {firstTitle[i].firstTitleFlag}&nbsp;
                {firstTitle[i].firstTitle}
              </span>
            </p>
            { contentPage }
          </div>,
        );

        if (secondTitle.length !== 0) {
          for (let j = 0, len1 = secondTitle.length; j < len1; j += 1) {
            const str = secondTitle[j].secondTitleFlag.split(".");

            if (Number(str[0]) === fir && str.length === 2 ) {
              const secondContent = secondTitle[j].secondTitleContent;
              const secondContentPage = [];

              if (secondContent) {
                for (let p = 0, le2 = secondContent.length; p < le2; p += 1) {
                  secondContentPage.push(
                    <p style={{margin: 0, lineHeight: "20.0pt"}} key={p+999}>
                      {
                        secondContent[p] === undefined  ? '' : (
                          <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: "20.0pt"}} onClick={() => {this.handleChangeSecondContent(j, p)}}>
                            {secondContent[p]}
                          </span>
                        )
                      }
                    </p>
                  );
                }
              }

              page.push(
                <div key={secondTitle[j].secondTitleFlag}>
                  <p style={{ marginTop: '12.0pt', marginBottom: '12.0pt', lineHeight: '20.0pt' }}>
                    <span style={{ fontFamily: 'SimHei', fontSize: '12.0pt', color: '#000', lineHeight: '20.0pt'}} onClick={() => {this.handleChangeSecondTitle(j)}}>
                      {secondTitle[j].secondTitleFlag}&nbsp;
                      {secondTitle[j].secondTitle}
                    </span>
                  </p>
                  { secondContentPage }
                </div>,
              );

              if (thirdTitle.length !== 0) {
                for (let k = 0, len2 = thirdTitle.length; k < len2; k += 1) {
                  const str1 = thirdTitle[k].thirdTitleFlag.split(".");
                  if (Number(str1[0]) === fir && Number(str1[1]) === Number(str[1]) && str1.length === 3 ) {

                    const thirdContent = thirdTitle[k].thirdTitleContent;
                    const thirdContentPage = [];

                    if (thirdContent) {
                      for (let s = 0, le3 = thirdContent.length; s < le3; s += 1) {
                        thirdContentPage.push(
                          <p style={{margin: 0, lineHeight: "20.0pt"}} key={s+9999}>
                            {
                              thirdContent[s] === undefined  ? '' : (
                                <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: "20.0pt"}} onClick={() => {this.handleChangeThirdContent(k, s)}}>
                                  {thirdContent[s]}
                                </span>
                              )
                            }
                          </p>
                        );
                      }
                    }

                    page.push(
                      <div key={thirdTitle[k].thirdTitleFlag}>
                        <p style={{ marginTop: '6.0pt', marginBottom: '6.0pt', lineHeight: '20.0pt' }}>
                          <span style={{ fontFamily: 'SimHei', fontSize: '12.0pt', color: '#000', lineHeight: '20.0pt' }} onClick={() => {this.handleChangeThirdTitle(k)}}>
                            {thirdTitle[k].thirdTitleFlag}&nbsp;
                            {thirdTitle[k].thirdTitle}
                          </span>
                        </p>
                        { thirdContentPage }
                      </div>,
                    );
                  }
                }
              }

            }

          }
        }

      }
    }

    this.setState({
      renderTitleAndContent: page,
    }, () => {
      this.renderThesis();
    })
  };

  // 修改一级标题
  handleChangeFirstTitle = (index) => {
    const { firstTitle } = this.state;
    this.setState({
      firstFlagChange: firstTitle[index].firstTitleFlag,
      firstTitleChange: firstTitle[index].firstTitle
    }, () => {
      Modal.confirm({
        title: '修改一级标题',
        width: 500,
        content: (
          <div>
            <Input
              defaultValue={firstTitle[index].firstTitleFlag}
              onChange={(val) => {
                this.setState({
                  firstFlagChange: val.target.value,
                });
              }}
            />
            <Input
              style={{marginTop: 10}}
              defaultValue={firstTitle[index].firstTitle}
              onChange={(val) => {
                this.setState({
                  firstTitleChange: val.target.value,
                });
              }}
            />
          </div>
        ),
        onOk: () => {
          const { firstFlagChange, firstTitleChange } = this.state;
          firstTitle[index].firstTitleFlag = firstFlagChange;
          firstTitle[index].firstTitle = firstTitleChange;
          this.setState({
            firstTitle,
            spanTip: '正在提交修改后的论文一级标题，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              first: []
            };
            val.first = firstTitle;
            dispatch({
              type: 'addThesisFormat/thesisFirst',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisFirst',
                  callback: (bodyFirst) => {
                    this.setState({
                      firstTitle: bodyFirst.first,
                      loading: false,
                    }, () => {
                      message.success('论文一级标题修改成功!');
                      this.renderThesisBody();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 修改一级标题下的内容
  handleChangeFirstContent = (i, q) => {
    const { firstTitle } = this.state;
    this.setState({
      firstTitleContentListItem: firstTitle[i].firstTitleContent[q],
    }, () => {
      Modal.confirm({
        title: '修改一级标题的内容',
        width: 900,
        content: (
          <div style={{display: "flex", flexDirection: 'column'}}>
            <Button style={{ marginBottom: 10 }} type="primary" onClick={() => {this.handleDeleteFirstContentItem(i, q)}}>删除该段文字</Button>
            <TextArea
              type="textarea"
              rows={6}
              defaultValue={firstTitle[i].firstTitleContent[q]}
              onChange={(val) => {
                this.setState({
                  firstTitleContentListItem : val.target.value,
                });
              }}
            />
          </div>
        ),
        onOk: () => {
          const { firstTitleContentListItem } = this.state;
          firstTitle[i].firstTitleContent[q] = firstTitleContentListItem;
          this.setState({
            firstTitle,
            spanTip: '正在提交修改后的论文一级标题下的内容，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              first: []
            };
            val.first = firstTitle;
            dispatch({
              type: 'addThesisFormat/thesisFirst',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisFirst',
                  callback: (bodyFirst) => {
                    this.setState({
                      firstTitle: bodyFirst.first,
                      loading: false,
                    }, () => {
                      message.success('论文一级标题下的内容修改成功!');
                      this.renderThesisBody();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });

  };

  // 删除一级标题的某内容
  handleDeleteFirstContentItem = (i, q) => {
    const { firstTitle } = this.state;
    Modal.confirm({
      title: '删除一级标题的某段内容',
      width: 900,
      content: (
        <div>
          <span>是否删除该段文字</span>
          <p style={{lineHeight: "20.0pt"}}>
            <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: "20.0pt"}}>
              {firstTitle[i].firstTitleContent[q]}
            </span>
          </p>
        </div>

      ),
      onOk: () => {
        firstTitle[i].firstTitleContent.splice(q, 1);
        this.setState({
          firstTitle,
          spanTip: '正在提交删除后的论文一级标题下的内容，请稍后...',
          loading: true,
        }, () => {
          this.destroyAll();
          const { dispatch } = this.props;
          const val = {
            first: []
          };
          val.first = firstTitle;
          dispatch({
            type: 'addThesisFormat/thesisFirst',
            payload: val,
            callback: () => {
              dispatch({
                type: 'addThesisFormat/getThesisFirst',
                callback: (bodyFirst) => {
                  this.setState({
                    firstTitle: bodyFirst.first,
                    loading: false,
                  }, () => {
                    message.success('论文一级标题下的内容删除一段成功!');
                    this.renderThesisBody();
                  });
                },
              });
            },
          });
        })
      },
      onCancel() {},
    });
  };

  // 修改二级标题
  handleChangeSecondTitle = (index) => {
    const { secondTitle } = this.state;
    this.setState({
      secondFlagChange: secondTitle[index].secondTitleFlag,
      secondTitleChange: secondTitle[index].secondTitle
    }, () => {
      Modal.confirm({
        title: '修改二级标题',
        width: 500,
        content: (
          <div>
            <Input
              defaultValue={secondTitle[index].secondTitleFlag}
              onChange={(val) => {
                this.setState({
                  secondFlagChange: val.target.value,
                });
              }}
            />
            <Input
              style={{marginTop: 10}}
              defaultValue={secondTitle[index].secondTitle}
              onChange={(val) => {
                this.setState({
                  secondTitleChange: val.target.value,
                });
              }}
            />
          </div>
        ),
        onOk: () => {
          const { secondFlagChange, secondTitleChange } = this.state;
          secondTitle[index].secondTitleFlag = secondFlagChange;
          secondTitle[index].secondTitle = secondTitleChange;
          this.setState({
            secondTitle,
            spanTip: '正在提交修改后的论文二级标题，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              second: []
            };
            val.second = secondTitle;
            dispatch({
              type: 'addThesisFormat/thesisSecond',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisSecond',
                  callback: (bodySecond) => {
                    this.setState({
                      secondTitle: bodySecond.second,
                      loading: false,
                    }, () => {
                      message.success('论文二级标题修改成功!');
                      this.renderThesisBody();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 修改二级标题下的内容
  handleChangeSecondContent = (i, q) => {
    const { secondTitle } = this.state;
    this.setState({
      secondTitleContentListItem: secondTitle[i].secondTitleContent[q],
    }, () => {
      Modal.confirm({
        title: '修改二级标题的内容',
        width: 900,
        content: (
          <div style={{display: "flex", flexDirection: 'column'}}>
            <Button style={{ marginBottom: 10 }} type="primary" onClick={() => {this.handleDeleteSecondContentItem(i, q)}}>删除该段文字</Button>
            <TextArea
              type="textarea"
              rows={6}
              defaultValue={secondTitle[i].secondTitleContent[q]}
              onChange={(val) => {
                this.setState({
                  secondTitleContentListItem : val.target.value,
                });
              }}
            />
          </div>
        ),
        onOk: () => {
          const { secondTitleContentListItem } = this.state;
          secondTitle[i].secondTitleContent[q] = secondTitleContentListItem;
          this.setState({
            secondTitle,
            spanTip: '正在提交修改后的论文二级标题下的内容，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              second: []
            };
            val.second = secondTitle;
            dispatch({
              type: 'addThesisFormat/thesisSecond',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisSecond',
                  callback: (bodySecond) => {
                    this.setState({
                      secondTitle: bodySecond.second,
                      loading: false,
                    }, () => {
                      message.success('论文二级标题下的内容修改成功!');
                      this.renderThesisBody();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 删除二级标题的某段内容
  handleDeleteSecondContentItem = (i, q) => {
    const { secondTitle } = this.state;
    Modal.confirm({
      title: '删除二标题的某段内容',
      width: 900,
      content: (
        <div>
          <span>是否删除该段文字</span>
          <p style={{lineHeight: "20.0pt"}}>
            <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: "20.0pt"}}>
              {secondTitle[i].secondTitleContent[q]}
            </span>
          </p>
        </div>

      ),
      onOk: () => {
        secondTitle[i].secondTitleContent.splice(q, 1);
        this.setState({
          secondTitle,
          spanTip: '正在提交删除后的论文二级标题下的内容，请稍后...',
          loading: true,
        }, () => {
          this.destroyAll();
          const { dispatch } = this.props;
          const val = {
            second: []
          };
          val.second = secondTitle;
          dispatch({
            type: 'addThesisFormat/thesisSecond',
            payload: val,
            callback: () => {
              dispatch({
                type: 'addThesisFormat/getThesisSecond',
                callback: (bodySecond) => {
                  this.setState({
                    secondTitle: bodySecond.second,
                    loading: false,
                  }, () => {
                    message.success('论文二级标题下的内容删除一段成功!');
                    this.renderThesisBody();
                  });
                },
              });
            },
          });
        });
      },
      onCancel() {},
    });
  };

  // 修改三级标题
  handleChangeThirdTitle = (index) => {
    const { thirdTitle } = this.state;
    this.setState({
      thirdFlagChange: thirdTitle[index].thirdTitleFlag,
      thirdTitleChange: thirdTitle[index].thirdTitle
    }, () => {
      Modal.confirm({
        title: '修改三级标题',
        width: 500,
        content: (
          <div>
            <Input
              defaultValue={thirdTitle[index].thirdTitleFlag}
              onChange={(val) => {
                this.setState({
                  thirdFlagChange: val.target.value,
                });
              }}
            />
            <Input
              style={{marginTop: 10}}
              defaultValue={thirdTitle[index].thirdTitle}
              onChange={(val) => {
                this.setState({
                  thirdTitleChange: val.target.value,
                });
              }}
            />
          </div>
        ),
        onOk: () => {
          const { thirdFlagChange, thirdTitleChange } = this.state;
          thirdTitle[index].thirdTitleFlag = thirdFlagChange;
          thirdTitle[index].thirdTitle = thirdTitleChange;
          this.setState({
            thirdTitle,
            spanTip: '正在提交修改后的论文三级标题，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              third: []
            };
            val.third = thirdTitle;
            dispatch({
              type: 'addThesisFormat/thesisThird',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisThird',
                  callback: (bodyThird) => {
                    this.setState({
                      thirdTitle: bodyThird.third,
                      loading: false,
                    }, () => {
                      message.success('论文三级标题修改成功!');
                      this.renderThesisBody();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 修改三级标题下的内容
  handleChangeThirdContent = (i, q) => {
    const { thirdTitle } = this.state;
    this.setState({
      thirdTitleContentListItem: thirdTitle[i].thirdTitleContent[q],
    }, () => {
      Modal.confirm({
        title: '修改三级标题的内容',
        width: 900,
        content: (
          <div style={{display: "flex", flexDirection: 'column'}}>
            <Button style={{ marginBottom: 10 }} type="primary" onClick={() => {this.handleDeleteThirdContentItem(i, q)}}>删除该段文字</Button>
            <TextArea
              type="textarea"
              rows={6}
              defaultValue={thirdTitle[i].thirdTitleContent[q]}
              onChange={(val) => {
                this.setState({
                  thirdTitleContentListItem : val.target.value,
                });
              }}
            />
          </div>
        ),
        onOk: () => {
          const { thirdTitleContentListItem } = this.state;
          thirdTitle[i].thirdTitleContent[q] = thirdTitleContentListItem;
          this.setState({
            thirdTitle,
            spanTip: '正在提交修改后的论文三级标题下的内容，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              third: []
            };
            val.third = thirdTitle;
            dispatch({
              type: 'addThesisFormat/thesisThird',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisThird',
                  callback: (bodyThird) => {
                    this.setState({
                      thirdTitle: bodyThird.third,
                      loading: false,
                    }, () => {
                      message.success('论文三级标题下的内容修改成功!');
                      this.renderThesisBody();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 删除三级标题下的某段内容
  handleDeleteThirdContentItem = (i, q) => {
    const { thirdTitle } = this.state;
    Modal.confirm({
      title: '删除三级标题的某段内容',
      width: 900,
      content: (
        <div>
          <span>是否删除该段文字</span>
          <p style={{lineHeight: "20.0pt"}}>
            <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: "20.0pt"}}>
              {thirdTitle[i].thirdTitleContent[q]}
            </span>
          </p>
        </div>

      ),
      onOk: () => {
        thirdTitle[i].thirdTitleContent.splice(q, 1);
        this.setState({
          thirdTitle,
          spanTip: '正在提交删除后的论文三级标题下的内容，请稍后...',
          loading: true,
        }, () => {
          this.destroyAll();
          const { dispatch } = this.props;
          const val = {
            third: []
          };
          val.third = thirdTitle;
          dispatch({
            type: 'addThesisFormat/thesisThird',
            payload: val,
            callback: () => {
              dispatch({
                type: 'addThesisFormat/getThesisThird',
                callback: (bodyThird) => {
                  this.setState({
                    thirdTitle: bodyThird.third,
                    loading: false,
                  }, () => {
                    message.success('论文三级标题下的内容删除一段成功!');
                    this.renderThesisBody();
                  });
                },
              });
            },
          });
        });
      },
      onCancel() {},
    });
  };

  ascendFirst = ( a ,b ) => {
    if (a.firstTitleFlag < b.firstTitleFlag) {
      return -1;
    }
    if (a.firstTitleFlag > b.firstTitleFlag) {
      return 1;
    }
    return 0;
  };

  ascendSecond = ( a ,b ) => {
    if (a.secondTitleFlag < b.secondTitleFlag) {
      return -1;
    }
    if (a.secondTitleFlag > b.secondTitleFlag) {
      return 1;
    }
    return 0;
  };

  ascendThird = ( a ,b ) => {
    if (a.thirdTitleFlag < b.thirdTitleFlag) {
      return -1;
    }
    if (a.thirdTitleFlag > b.thirdTitleFlag) {
      return 1;
    }
    return 0;
  };

  renderReferenceItem = () => {
    const { formReference } = this.state;
    const page = [];
    if(formReference.length !== 0){
      for (let i = 0, len = formReference.length; i < len; i += 1) {
        page.push(
          <p style={{ margin: '16px 0', lineHeight: '20.0pt'}} key={i}>
            <span style={{ fontFamily: "Times New Roman", fontSize: '12.0pt', color: '#000', lineHeight: '20.0pt'}}>[{i+1}] </span>
            <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000', lineHeight: '20.0pt'}} onClick={() => {this.handleChangeReference(i)}}>{formReference[i]}</span>
          </p>,
        );
      }
      this.setState({
        renderFormReferenceItem: page
      }, () => {
        this.renderReference()
      })
    }
  };

  renderReference = () => {
    const { renderFormReferenceItem } = this.state;
    const page = (
      <div>
        <p style={{ marginTop: '24.0pt', marginBottom: '12.0pt', lineHeight: '20.0pt', fontFamily: 'SimHei', fontSize: '14.0pt', color: '#000' }}>
          参考文献
        </p>
        {renderFormReferenceItem}
      </div>
    );
    this.setState({
      renderFormReference: page
    }, () => {
      this.renderThesis();
    })
  };

  // 修改参考文献
  handleChangeReference = (index) => {
    const { formReference } = this.state;
    this.setState({
      referenceChangeItem: formReference[index],
    }, () => {
      Modal.confirm({
        title: '修改论文参考文献',
        width:900,
        content: (
          <div style={{display: "flex", flexDirection: 'row'}}>
            <Input
              defaultValue={formReference[index]}
              onChange={(val) => {
                this.setState({
                  referenceChangeItem : val.target.value,
                });
              }}
            />
            <Button style={{ margin: "0 5px" }} type="primary" onClick={() => {this.handleDeleteReference(index)}}>删除该条参考文献</Button>
          </div>
        ),
        onOk: () => {
          const { referenceChangeItem } = this.state;
          formReference[index] = referenceChangeItem;
          this.setState({
            formReference,
            spanTip: '正在提交修改后的论文参考文献，请稍后...',
            loading: true,
          }, () => {
            const { dispatch } = this.props;
            const val = {
              formReference: []
            };
            val.formReference = formReference;
            dispatch({
              type: 'addThesisFormat/thesisReference',
              payload: val,
              callback: () => {
                dispatch({
                  type: 'addThesisFormat/getThesisReference',
                  callback: (reference) => {
                    this.setState({
                      formReference: reference.formReference,
                      loading: false,
                    }, () => {
                      message.success('论文参考文献修改成功!');
                      this.renderReferenceItem();
                    });
                  },
                });
              },
            });
          })
        },
        onCancel() {},
      });
    });
  };

  // 删除某一条参考文献
  handleDeleteReference = (index) => {
    const { formReference } = this.state;
    Modal.confirm({
      title: '删除参考文献',
      width: 900,
      content: (
        <div>
          <span>是否删除该条文献 ？</span>
          <p style={{ margin: '16px 0' }}>
            <span style={{ fontFamily: "Times New Roman", fontSize: '12.0pt', fontWeight: 'bold', color: '#000'}}>[{index+1}]　</span>
            <span style={{ fontFamily: '"Times New Roman", "SimSun"', fontSize: '12.0pt',color: '#000'}}>{formReference[index]}</span>
          </p>
        </div>

      ),
      onOk: () => {
        formReference.splice(index, 1);
        this.setState({
          formReference,
          spanTip: '正在提交删除后的论文参考文献，请稍后...',
          loading: true,
        }, () => {
          this.destroyAll();
          const { dispatch } = this.props;
          const val = {
            formReference: []
          };
          val.formReference = formReference;
          dispatch({
            type: 'addThesisFormat/thesisReference',
            payload: val,
            callback: () => {
              dispatch({
                type: 'addThesisFormat/getThesisReference',
                callback: (reference) => {
                  this.setState({
                    formReference: reference.formReference,
                    loading: false,
                  }, () => {
                    message.success('论文参考文献删除一段成功!');
                    this.renderReferenceItem();
                  });
                },
              });
            },
          });
        });
      },
      onCancel() {},
    });
  };

  renderThesis = () => {
    const {
      renderFormTitle,
      renderFormCnAbstract,
      renderFormCnKeyWords,
      renderTitleAndContent,
      renderFormReference,
      renderEgFormTitle,
      renderFormEgAbstract,
      renderFormEgKeyWords,
    } = this.state;
    const page = (
      <div style={{width: '600.0pt', marginBottom: '72.0pt', marginTop: '72.0pt', marginLeft: '90.0pt', marginRight: '90.0pt'}} key={99999999} ref={(mol) => {this.test = mol;}}>
        {/* 论文标题 */}
        { renderFormTitle }

        {/* 论文中文摘要 */}
        { renderFormCnAbstract }

        {/* 论文中文关键词 */}
        { renderFormCnKeyWords }

        {/* 论文正文 */}
        { renderTitleAndContent }

        {/* 参考文献 */}
        { renderFormReference }

        {/* 论文英文标题 */}
        { renderEgFormTitle }

        {/* 英文摘要 */}
        { renderFormEgAbstract }

        {/* 英文关键字 */}
        { renderFormEgKeyWords }

      </div>
    );

    this.setState({
      thesis: page,
    }, () => {
      const str = this.test.innerHTML;
      this.setState({
        thesisHTML: str
      })
    })
  };

  // 往后台发送 html
  handleHTML = () => {
    this.setState({
      loading: true,
      spanTip: '正在提交整篇论文，请稍后...',
    }, () => {
      const { dispatch } = this.props;
      const { thesisHTML } = this.state;
      const html = {};
      html.render = thesisHTML;
      dispatch({
        type: 'addThesisFormat/pHTML',
        payload: html,
        callback: (response) => {
          this.setState({
            loading: false
          }, () => {
            if (response.message === '保存成功') {
              message.success(response.message);
              router.push({
                pathname: '/thesisWriting/editThesis',
              });
            }
          });
        },
      });
    });
  };

  render() {
    const { visible, buttonRender, modelTitle, thesis, loading, spanTip } = this.state;
    const {
      form,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>

        {buttonRender}

        <Button style={{marginRight: 20,marginTop: 10, width: 150}} onClick={() => {this.handleHTML()}}>提交</Button>

      </div>
    );

    return (
      <PageHeaderWrapper title="论文录入页面" content={content}>

        <Spin tip={spanTip} spinning={loading}>

          <div className={styles.container}>

            <div style={{ display: 'flex', flexDirection: 'column' }}>

              <Card className={styles.cn} bordered={false}>

                {
                  thesis.length === 0 ? (
                    <div className={styles.thesisBox}>
                      <Empty description={<span>您还没录入论文哦，请按上面按钮对论文进行录入!</span>} />
                    </div>
                  ) : thesis
                }

                <Modal
                  title={modelTitle}
                  visible={visible}
                  width={900}
                  onOk={() => {
                    this.handleOk();
                  }}
                  onCancel={this.handleCancel}
                >

                  {/* 论文中文题目 */}
                  {
                    modelTitle === '论文中文题目' ? (
                      <FormItem label="论文中文题目" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('title', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<Input placeholder="请输入论文的标题" />)}
                      </FormItem>
                    ) : ''
                  }

                  {/* 中文摘要 */}
                  {
                    modelTitle === '中文摘要' ? (
                      <FormItem label="中文摘要" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('cnAbstract', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<TextArea placeholder="请输入中文摘要" type="textarea" rows={6} />)}
                      </FormItem>
                    ) : ''
                  }

                  {/* 摘要中文的关键字 */}
                  {
                    modelTitle === '中文关键字' ? (
                      <FormItem label="中文关键字" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('cnKeyWords', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<Input placeholder="请输入3-5个中文摘要的关键字，以中文分号 [ ；] 结束，注：最后一个关键字不用加分号，格式如：xxx；xxx；xxx；xxx" />)}
                      </FormItem>
                    ) : ''
                  }

                  {/* 一级标题 */}
                  {
                    modelTitle === '一级标题' ? (
                      <div>
                        <FormItem label="一级标题标题号" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('firstTitleFlag', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入一级标题的标题号，如：1，则为正文标题的以及标题" />)}
                        </FormItem>
                        <FormItem label="一级标题" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('firstTitle', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入一级标题" />)}
                        </FormItem>
                        <FormItem label="一级标题第一段内容" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('firstTitleContent', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<TextArea placeholder="请输入一级标题第一段内容，若没有内容可不填" type="textarea" rows={6} />)}
                        </FormItem>
                      </div>
                    ) : ''
                  }

                  {/* 追加一级标题内容 */}
                  {
                    modelTitle === '追加一级标题内容' ? (
                      <div>
                        <FormItem label="一级标题标题号" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('firstTitleFlag', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入一级标题的标题号，如：1，则为正文标题的以及标题，请务必与一级标题的标号一样" />)}
                        </FormItem>
                        <FormItem label="追加一级标题内容(此为以及标题第一段以后的段落)" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('firstTitleContent', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<TextArea placeholder="请输入想追加的一级标题的内容的段落" type="textarea" rows={6} />)}
                        </FormItem>
                      </div>
                    ) : ''
                  }

                  {/* 二级标题 */}
                  {
                    modelTitle === '二级标题' ? (
                      <div>
                        <FormItem label="二级标题标题号" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('secondTitleFlag', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入二级标题的标题号，如：1.1，则为正文二级标题的以及标题" />)}
                        </FormItem>
                        <FormItem label="二级标题" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('secondTitle', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入二级标题" />)}
                        </FormItem>
                        <FormItem label="二级标题第一段内容" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('secondTitleContent', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<TextArea placeholder="请输入二级标题第一段内容" type="textarea" rows={6} />)}
                        </FormItem>
                      </div>
                    ) : ''
                  }

                  {/* 追加二级标题内容 */}
                  {
                    modelTitle === '追加二级标题内容' ? (
                      <div>
                        <FormItem label="二级标题标题号" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('secondTitleFlag', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入二级标题的标题号，如：1.1 ，则为正文标题的以及标题，请务必与二级标题的标号一样" />)}
                        </FormItem>
                        <FormItem label="追加二级标题内容(此为二级标题第一段以后的段落)" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('secondTitleContent', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<TextArea placeholder="请输入想追加的二级标题的内容的段落" type="textarea" rows={6} />)}
                        </FormItem>
                      </div>
                    ) : ''
                  }

                  {/* 三级标题 */}
                  {
                    modelTitle === '三级标题' ? (
                      <div>
                        <FormItem label="三级标题标题号" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('thirdTitleFlag', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入三级标题的标题号，如：1.1.1，则为正文三级标题的以及标题" />)}
                        </FormItem>
                        <FormItem label="三级标题" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('thirdTitle', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入三级标题" />)}
                        </FormItem>
                        <FormItem label="三级标题第一段内容" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('thirdTitleContent', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<TextArea placeholder="请输入三级标题第一段内容" type="textarea" rows={6} />)}
                        </FormItem>
                      </div>
                    ) : ''
                  }

                  {/* 追加三级标题内容 */}
                  {
                    modelTitle === '追加三级标题内容' ? (
                      <div>
                        <FormItem label="三级标题标题号" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('thirdTitleFlag', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<Input placeholder="请输入三级标题的标题号，如：1.1.1 ，则为正文标题的以及标题，请务必与三级标题的标号一样" />)}
                        </FormItem>
                        <FormItem label="追加三级标题内容(此为三级标题第一段以后的段落)" style={{ marginBottom: 0 }}>
                          {form.getFieldDecorator('thirdTitleContent', {
                            // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                          })(<TextArea placeholder="请输入想追加的三级标题的内容的段落" type="textarea" rows={6} />)}
                        </FormItem>
                      </div>
                    ) : ''
                  }

                  {/* 参考文献 */}
                  {
                    modelTitle === '参考文献' ? (
                      <FormItem label="参考文献" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('reference', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<Input placeholder="请分条输入参考文献" />)}
                      </FormItem>
                    ) : ''
                  }

                  {/* 论文英文题目 */}
                  {
                    modelTitle === '论文英文题目' ? (
                      <FormItem label="论文英文题目" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('egTitle', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<Input placeholder="请输入论文英文题目" />)}
                      </FormItem>
                    ) : ''
                  }

                  {/* 英文摘要 */}
                  {
                    modelTitle === '英文摘要' ? (
                      <FormItem label="英文摘要" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('egAbstract', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<TextArea placeholder="请输入英文摘要（标点符号请采用英文标点）" type="textarea" rows={6} />)}
                      </FormItem>
                    ) : ''
                  }

                  {/* 摘要英文的关键字 */}
                  {
                    modelTitle === '英文关键字' ? (
                      <FormItem label="英文关键字" style={{ marginBottom: 0 }}>
                        {form.getFieldDecorator('egKeyWords', {
                          // rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
                        })(<Input placeholder="请输入3-5个英文摘要的关键字，以英文分号和一个空格 [ ;  ] 结束，注：最后一个关键字不用加分号，格式如：xxx; xxx; xxx; xxx" />)}
                      </FormItem>
                    ) : ''
                  }

                </Modal>

              </Card>

            </div>

          </div>

        </Spin>

      </PageHeaderWrapper>
    );
  }

}

export default AddThesisFormat;
