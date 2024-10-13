const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'User',
      path: '/user',
      icon: 'mdi:user-check'
    },
    {
      path: '/permissions',
      action: 'read',
      subject: 'acl-page',
      title: 'Permissions',
      icon: 'mdi:shield-outline'
    },
    {
      path: '/roles',
      action: 'read',
      subject: 'role-page',
      title: 'Roles',
      icon: 'mdi:work'
    }
  ]
}

export default navigation
