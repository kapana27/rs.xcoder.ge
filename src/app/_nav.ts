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
    children: [
      {
        name: 'ზედდებულები',
        icon: 'icon-puzzle',
        children:[
          {
            name: 'საწყობი',
            url: '/report/warehouse',
            icon: 'icon-puzzle',
          },
          {
            name: 'ქონების მართვა',
            url: '/report/property',
            icon: 'icon-puzzle',
          },
          {
            name: 'თანამშრომელი',
            url: '/report/employee',
            icon: 'icon-puzzle',
          }
        ]
      }
    ]
  },
  {
    name: 'ცნობარი',
    url: '/directory',
    icon: 'icon-speedometer',
  },
  {
    name: 'დოკუმენტბრუნვა',
    url: '/documentTurnover',
    icon: 'icon-speedometer',
    children: [

      {
        name: 'ახალი მოთხოვნა',
        url: '/documentTurnover/out',
        icon: 'icon-puzzle'
      },
      {
        name: 'სამმართველო',
        url: '/documentTurnover/in',
        icon: 'icon-puzzle'
      },
      {
        name: 'დეპარტამენტი',
        url: '/documentTurnover/department',
        icon: 'icon-puzzle'
      },

      {
        name: 'ფინანსები',
        url: '/documentTurnover/finance',
        icon: 'icon-puzzle'
      },{
        name: 'ლოჯისტიკის სამმსართველო',
        url: '/documentTurnover/logistic',
        icon: 'icon-puzzle'
      },
      {
        name: 'საწყობი',
        url: '/documentTurnover/warehouse',
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
