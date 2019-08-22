interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  /*{
    name: 'ოპერაციები',
    url: '/management',
    icon: 'icon-speedometer',

    children: [
      {
        name: 'ქონების მართვა',
        url: '/management/property',
        icon: 'icon-puzzle'
      },
      {
        name: 'საწყობის მართვა',
        url: '/management/warehouse',
        icon: 'icon-puzzle'
      }
    ]
  },*/

  {
    name: 'საწყობის მართვა',
    url: '/management/warehouse',
    icon: 'icon-puzzle'
  },
  {
    name: 'ქონების მართვა',
    url: '/management/property',
    icon: 'icon-puzzle'
  },
  {
    name: 'შეტყობინებები',
    url: '/messages',
    icon: 'icon-puzzle',
  },
  /*{
    name: 'მიღების ოპერაციები',
    url: '/incomeOperations',
    icon: 'icon-puzzle',
  },*/
  {
    name: 'რეპორტი',
    url: '/report',
    icon: 'icon-speedometer',
  },
  {
    name: 'ცნობარი',
    url: '/directory',
    icon: 'icon-speedometer',
  },
  {
    name: 'მოთხოვნები',
    url: '/documentTurnover',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'შემოსული',
        url: '/documentTurnover/in',
        icon: 'icon-puzzle'
      },
      {
        name: 'გასული',
        url: '/documentTurnover/out',
        icon: 'icon-puzzle'
      },
      {
        name: 'დადასტურებული',
        url: '/documentTurnover/in',
        icon: 'icon-puzzle'
      },
      {
        name: 'უარყოფილი',
        url: '/documentTurnover/out',
        icon: 'icon-puzzle'
      }
    ]
  },
  /*{
    name: 'ტესტი',
    url: '/test',
    icon: 'icon-speedometer',
  },
  {
    name: 'ტესტი1',
    url: '/test1',
    icon: 'icon-speedometer',
  },*/
  /*{
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
   {
    divider: true
  },
 {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      }
    ]
  } */
];
