import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARD.TEXT',
        icon: 'ph-gauge',
        collapseid: 'sidebarDashboards',
        subItems: [
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
                link: '/',
                parentId: 2
            },
            {
              id: 6,
              label: 'MENUITEMS.DASHBOARD.LIST.INFO',
              link: '/info-app',
              parentId: 2
            },
            {
              id: 8,
              label: 'MENUITEMS.DASHBOARD.LIST.GRAPHS',
              link: '/tesis-graphs',
              parentId: 2
            },
            {
              id: 9,
              label: 'MENUITEMS.DASHBOARD.LIST.MAPS',
              link: '/tesis-maps',
              parentId: 2
            }
        ]
    },
    {
        id: 87,
        label: 'MENUITEMS.COMPONENTS.TEXT',
        isTitle: true
    },
    {
        id: 125,
        label: 'MENUITEMS.FORMS.TEXT',
        icon: 'ri-file-list-3-line',
        collapseid: 'sidebarForms',
        subItems: [
            {
              id: 138,
              label: 'MENUITEMS.FORMS.LIST.TESISFORM',
              link: '/forms/tesis-predict',
              parentId: 125
            }
        ]
    }
]
