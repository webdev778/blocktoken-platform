export default [
  {
    title: 'Dashboard',
    key: 'admin_dashboard',
    url: '/admin/dashboard',
    icon: 'icmn icmn-home',
  },
  {
    title: 'Manage',
    key: 'admin_manage',
    icon: 'icmn',
    children: [
      {
        title: 'Users',
        key: 'admin_users',
        url: '/admin/users',
      },
      {
        title: 'Identity',
        key: 'admin_identity',
        url: '/admin/identity',
      },
      {
        title: 'Contributors to ICOs',
        key: 'admin_cont-icos',
        url: '/admin/cont-icos',
      },
      {
        title: 'Contributors to Syndicates',
        key: 'admin_cont-syn',
        url: '/admin/cont-syn',
      },
      {
        title: 'Tokens',
        key: 'admin_tokens',
        url: '/admin/tokens',
      },
      {
        title: 'Smart Contracts',
        key: 'admin_crowdsales',
        url: '/admin/crowdsales',
      },
      {
        title: 'Syndicates',
        key: 'admin_syn',
        url: '/admin/syn',
      },
      {
        title: 'Projects',
        key: 'admin_projects',
        url: '/admin/projects',
      },
    ],
  },
  {
    title: 'BlockToken Rewards',
    key: 'admin_blocktoken',
    icon: 'icmn',
    children: [
      {
        title: 'Referrals',
        key: 'admin_referrals',
        url: '/admin/referrals',
      },
      {
        title: 'AirDrop Registrations',
        key: 'airdrop_reg',
        url: '/admin/airdrop-reg',
      },
    ],
  },
  {
    title: 'Create',
    key: 'admin_create',
    icon: '',
    children: [
      {
        title: 'Create Project',
        key: 'project_wizard',
        url: '/admin/project-wizard',
      },
      {
        title: 'Token Wizard',
        key: 'token_wizard',
        url: '/admin/token-wizard',
      },
      {
        title: 'Smart Contracts',
        key: 'crowdsale',
        url: '/token/crowdsale',
      },
      {
        title: 'Create a Syndicate',
        key: 'syn_wizard',
        url: '/syndicate-wizard',
      },
    ],
  },
]
