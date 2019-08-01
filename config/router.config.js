export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/user/login' },
      // 书写规范说明
      {
        path: '/writingStandard',
        name: 'writingStandard',
        routes: [
          {
            path: '/writingStandard/writingStandard',
            name: 'writingStandard',
            component: './WritingStandard/WritingStandard',
          },
          {
            path: '/writingStandard/formatRequirement',
            name: 'formatRequirement',
            component: './WritingStandard/FormatRequirement',
          },
        ],
      },

      // 封面介绍
      {
        path: '/thesisCover/thesisCover',
        name: 'thesisCover',
        component: './ThesisCover/ThesisCover',
      },

      // 学术诚信
      {
        path: '/honesty/honesty',
        name: 'honesty',
        component: './Honesty/Honesty',
      },

      // 目录
      {
        path: '/catalog/catalog',
        name: 'catalog',
        component: './Catalog/Catalog',
      },

      // 正文
      {
        path: '/thesisBody/thesisBody',
        name: 'thesisBody',
        component: './ThesisBody/ThesisBody',
      },

      // 参考文献
      {
        path: '/reference/reference',
        name: 'reference',
        component: './Reference/Reference',
      },

      // 英文摘要
      {
        path: '/englishAbstract/englishAbstract',
        name: 'englishAbstract',
        component: './EnglishAbstract/EnglishAbstract',
      },

      // 附录说明
      {
        path: '/appendix/appendix',
        name: 'appendix',
        component: './Appendix/Appendix',
      },

      // 致谢
      {
        path: '/thank/thank',
        name: 'thank',
        component: './Thank/Thank',
      },

      // 双向选择
      {
        path: '/twoWaySelection/twoWaySelection',
        name: 'twoWaySelection.twoWaySelection',
        component: './TwoWaySelection/TwoWaySelection',
      },

      // 老师查看论文
      {
        path: '/viewThesis/viewThesis',
        name: 'viewThesis',
        component: './ViewThesis/ViewThesis',
        authority: ['user'],
      },

      // 论文书写格式页面
      {
        path: '/thesisWriting/addThesisFormat',
        name: 'thesisWriting.addThesisFormat',
        authority: ['admin'],
        component: './ThesisWriting/AddThesisFormat',
      },

      // 论文编辑页面
      {
        path: '/thesisWriting/editThesis',
        name: 'thesisWriting.editThesis',
        authority: ['admin'],
        component: './ThesisWriting/EditThesis',
      },

      // 论文查看页面
      {
        path: '/thesisWriting/thesisWriting',
        name: 'thesisWriting.thesisWriting',
        authority: ['admin'],
        component: './ThesisWriting/ThesisWriting',
        hideInMenu: true,
      },

      // 修改密码
      {
        path: '/changePassword/changePassword',
        name: 'changePassword.changePassword',
        component: './ChangePassword/ChangePassword',
        hideInMenu: true,
      },

      {
        component: '404',
      },
    ],
  },
];
