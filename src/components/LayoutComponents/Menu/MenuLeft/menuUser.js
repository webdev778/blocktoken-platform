export default [
  {
    title: 'Dashboard',
    key: 'user_dashboard',
    url: '/user/dashboard',
    icon: 'icmn icmn-home',
  },
  {
    title: 'My Profile',
    key: 'profile',
    icon: 'icmn icmn-profile',
    children: [
      {
        title: 'Account',
        key: 'account',
        url: '/account',
      },
      {
        title: 'Identity',
        key: 'identity',
        url: '/identity',
      },
      {
        title: 'My Wallet',
        key: 'wallet',
        url: '/wallet',
      },
    ],
  },
  {
    title: 'Contribute',
    key: 'contribute',
    icon: 'icmn icmn-share',
    children: [
      {
        title: 'View Projects',
        key: 'activeproject',
        url: '/projects/active',
      },
      {
        title: 'My Tokens',
        key: 'contributions',
        url: '/contributions',
      },
      {
        title: 'Join a Syndicate',
        key: 'joinSyndicate',
        url: '/syndicates',
      },
    ],
  },
  {
    title: 'Rewards',
    key: 'rewards',
    icon: '',
    children: [
      {
        title: 'Referral Link',
        key: 'referral',
        url: '/referral',
      },
      {
        title: 'My Referrals',
        key: 'balance',
        url: '/referral/balance',
      },
      {
        title: 'Airdrop',
        key: 'airdrop',
        url: '/airdrop',
      },
    ],
  },
  {
    title: 'Projects',
    key: 'projects',
    icon: '',
    children: [
      {
        title: 'Create Project',
        key: 'createProject',
        url: '/project-wizard',
      },
      {
        title: 'View Projects',
        key: 'viewProjects',
        url: '/my-projects',
      },
    ],
  },
  {
    title: 'Token Builder',
    key: 'tokenBuilder',
    icon: '',
    children: [
      {
        title: 'Token Wizard',
        key: 'tokenWizard',
        url: '/token-wizard/token',
      },
      {
        title: 'Tokens',
        key: 'tokens',
        url: '/token/list',
      },
      {
        title: 'Smart Contracts',
        key: 'smartContracts',
        url: '/token/crowdsale',
      },
      {
        title: 'Manage',
        key: 'manage',
        url: '/token/admin',
      },
    ],
  },

  {
    title: 'Syndicates',
    key: 'syndicates',
    icon: '',
    children: [
      {
        title: 'Create a Syndicate',
        key: 'createSyndicate',
        url: '/syndicate-wizard',
      },
      {
        title: 'View Syndicates',
        key: 'viewSyndicates',
        url: '/syndicates',
      },
    ],
  },
  {
    title: 'Marketing Services',
    key: 'marketingServices',
    icon: '',
    url: '/services',
  },
]
