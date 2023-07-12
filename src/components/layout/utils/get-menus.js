export const getMenus = () => [
  {
    name: "introduction",
    title: "研究院概况",
    icon: "introduction",
    children: [
      {
        title: "院况简介",
        path: "/introduction/contents-introduction-summary",
      },
      {
        title: "组织架构",
        path: "/introduction/contents-introduction-organization",
      },
    ],
  },
  {
    name: "team",
    title: "研究队伍",
    icon: "team",
    children: [
      {
        title: "工学队伍",
        path: "/team/team-members-team-ergonomic",
      },
      {
        title: "医学队伍",
        path: "/team/team-members-team-medicine",
      },
      {
        title: "博硕学生",
        path: "/team/contents-team-student",
      },
    ],
  },
  {
    name: "information",
    title: "科学研究",
    icon: "information",
    children: [
      {
        title: "技术研发中心",
        path: "/research/researches-research-tech",
      },
      {
        title: "应用研究与临床转化",
        path: "/research/researches-research-application",
      },
    ],
  },
  {
    name: "fruit",
    title: "科研成果",
    icon: "research",
    children: [
      {
        title: "获奖情况",
        path: "/fruit/contents-fruit-rewarded",
      },
      {
        title: "专利",
        path: "/fruit/contents-fruit-patents",
      },
      {
        title: "论文",
        path: "/fruit/contents-fruit-theses",
      },
    ],
  },
  {
    name: "talent",
    title: "人才培养",
    icon: "talent",
    children: [
      {
        title: "人才培养",
        path: "/talents/contents-talents",
      },
    ],
  },
  {
    name: "information",
    title: "最新动态",
    icon: "information",
    children: [
      {
        title: "我院新闻",
        path: "/information/articles-information-news",
      },
      {
        title: "活动通知",
        path: "/information/articles-information-notices",
      },
    ],
  },
  {
    name: "other",
    title: "招贤纳士",
    icon: "other",
    children: [
      {
        title: "联系我们",
        path: "/contact/contents-contact",
      },
      {
        title: "招聘岗位",
        path: "/contact/jobs",
      },
    ],
  },
];
