import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Modal, Spin, message } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import draftjs from 'draftjs-to-html'
import draftToHtml from 'draftjs-to-html'
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import styles from './ThesisWriting.less';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

@connect(({ thesisWriting, loading }) => ({
  thesisWriting,
  loading: loading.models.thesisWriting,
}))
class ThesisWriting extends Component {

  state = {
    showRichText:false,
    editorContent: '',
    editorState: '',
    loading: false,
    attention: [
      "1、本论文写书暂不支持表格",
      "2、图片需自行加上底部分的图片编码，如: 图2-1",
      "3、本论文书写暂不支持粘贴复制、粘贴过来的文字样式，需自己重新添加",
      "4、字体磅数对应: <a href='https://wenku.baidu.com/view/6bd7d1dbce2f0066f53322dd.html' title='来源于百度', target='_blank'>点击查看</a>"
    ],
    attentionList: [],
  };

  componentWillMount = () => {
    this.renderAttention();
  };

  componentDidMount = () =>{
    const { location } = this.props;
    this.renderAttention();
    console.log(location.query);
    console.log(typeof(location.query));
    if (location.query) {
      if (typeof(location.query) !== "string") {
        const str = JSON.stringify(location.query);
        const str2 = str.replace(/textAlign/g,"text-align");
        const str3 = JSON.parse(str2);
        const str4 = draftToHtml(str3);
        this.handleEdit(str4);
      } else {
        this.handleEdit(location.query);
      }
    } else {
      const thesis = '<p>您还没开始书写论文，请现在开始书写自己的论文吧!</p>';
      this.handleEdit(thesis);
    }
  };

  handleClearContent = ()=>{
    this.setState({
      editorState:''
    })
  };

  handleGetText = ()=>{
    const { editorContent } = this.state;
    this.setState({
      showRichText:true
    }, () => {
      console.log(draftToHtml(editorContent));
    })
  };

  onEditorChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  imageUploadCallBack = file => new Promise(
    (resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(file);
      const img = new Image();
      // let url = ''
      reader.onload = function () {
        img.src = this.result
      };

      img.onload = function () {
        // console.log(img); // 获取图片
        console.log(img.src.length);
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        const canvas = document.createElement('canvas');
        console.log(canvas);
        const context = canvas.getContext('2d');

        // console.log(context);

        // 图片原始尺寸
        const originWidth = this.width;
        const originHeight = this.height;

        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        const maxWidth = 400;
        const maxHeight = 500;
        // 目标尺寸
        let targetWidth = originWidth;
        let targetHeight = originHeight;
        // 图片尺寸超过300x300的限制
        if(originWidth > maxWidth || originHeight > maxHeight) {
          if(originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        /* 第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高 */

        // 压缩后的图片转base64 url
        /* canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
          * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92 */
        const newUrl = canvas.toDataURL('image/jpeg', 0.92);// base64 格式

        // 也可以把压缩后的图片转blob格式用于上传
        canvas.toBlob((blob)=>{
          console.log(blob);
          // 把blob作为参数传给后端
        }, 'image/jpeg', 0.92);

        resolve({
          data: {
            link: newUrl
          }
        });

      }
    }
  );

  // 提交内容含HTML
  handleSubmit = () => {
    const { editorContent } = this.state;
    const { dispatch } = this.props;
    const str = JSON.stringify(editorContent);
    const str2 = str.replace(/text-align/g,"textAlign");
    const str3 = JSON.parse(str2);
    this.setState({
      loading: true,
    });
    console.log(str3);
    if (str3) {
      dispatch({
        type: 'thesisWriting/post',
        payload: str3,
        callback: () => {
          this.setState({
            loading: false,
          });
        }
      });
    } else {
      return (
        <Link to={{ pathname: '/thesisWriting/editThesis' }}>
          提交论文
        </Link>
      )
    }
    this.setState({
      editorContent: draftToHtml(editorContent)
    }, () => {
      console.log(editorContent);
      console.log(draftToHtml(editorContent));
    });
  };

  handleEdit = (thesis) => {
    const sampleMarkup = thesis;
    const blocksFromHTML = htmlToDraft(sampleMarkup);

    console.log(sampleMarkup);
    console.log(blocksFromHTML);

    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    console.log(state);
    console.log(EditorState.createWithContent(state));
    this.setState({
      editorState:  EditorState.createWithContent(state)
    });
  };

  renderAttention = () => {
    const { attention } = this.state;
    const page = [];

    for (let i = 0, len = attention.length; i < len; i += 1) {
      page.push(
        <span key={i} dangerouslySetInnerHTML={{__html:attention[i]}} />
      );
    }
    this.setState({
      attentionList: page
    });
  };

  render() {
    const { editorContent, editorState, showRichText, loading, attentionList } = this.state;

    const content = (
      <div className={styles.pageHeaderContent}>

        <div className={styles.pageHeader}>

          <div className={styles.headerContent}>
            {attentionList}
          </div>

          <div>

            <Button type="primary" onClick={this.handleSubmit} style={{ marginRight: 40 }}>
              <Link to={{ pathname: '/thesisWriting/editThesis'}}>
                提交论文
              </Link>
            </Button>

            <Button onClick={this.handleClearContent} style={{ marginRight: 10 }}>清空内容</Button>
            {/* <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button> */}
            {/* <Button type="primary" onClick={this.handleEdit} style={{marginRight: 10}}>HTML转JS</Button> */}

          </div>

        </div>

      </div>
    );

    return (

      <PageHeaderWrapper content={content}>

        <Spin tip="正在提交论文，请稍后..." spinning={loading}>

          <div className={styles.container}>

            <div className={styles.editorBox}>

              <Editor
                editorState={editorState}
                onContentStateChange={this.onEditorChange}
                onEditorStateChange={this.onEditorStateChange}
                wrapperClassName="wysiwyg-wrapper"
                editorStyle={{
                  height: 800,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#F1F1F1',
                  background: 'white',
                }}
                localization={{
                  locale: 'zh',
                }}
                toolbar={{
                  options: ['inline', 'fontSize', 'fontFamily', 'image', 'list', 'textAlign', 'link', 'remove', 'history'],
                  fontSize: {
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
                  },
                  fontFamily: {
                    options: ['宋体', '黑体', 'Times New Roman'],
                  },
                  list: {
                    options: ['unordered', 'ordered'],
                  },
                  toolbarClassName: 'home-toolbar',
                  wrapperClassName: 'home-wrapper',
                  image: {
                    urlEnabled: true,
                    uploadEnabled: true,
                    alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                    uploadCallback: this.imageUploadCallBack,  // 图片的处理 （但是仅限于本地上传的，url方式不经过此函数）
                    previewImage: true,
                    inputAccept: 'image/*',
                    alt: { present: false, mandatory: false },
                  },
                }}
              />

            </div>


            <Modal
              title="富文本"
              visible={showRichText}
              onCancel={() => {
                this.setState({
                  showRichText: false,
                });
              }}
              footer={null}
            >
              {draftToHtml(editorContent)}
            </Modal>

          </div>

        </Spin>

      </PageHeaderWrapper>

    );
  }
}

export default ThesisWriting;
