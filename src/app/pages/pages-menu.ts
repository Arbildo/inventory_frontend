import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_JEFE_ALMACENERO: NbMenuItem[] = [
  {
    title: 'Principal',
    icon: 'info-outline',
    link: '/pages/',
    home: true,
  },
  {
    title: 'ADMINISTRACIÓN',
    group: true,
  },
  {
    title: 'Productos',
    icon: 'cube-outline',
    children: [
      {
        title: 'Productos',
        link: '/pages/products',
      },
      {
        title: 'Lotes',
        link: '/pages/products/lots',
      },
      {
        title: 'Ingreso de productos',
        link: '/pages/products/input',
      },
      ],
  },
  {
    title: 'Salidas',
    icon: 'cube-outline',
    children: [
      {
        title: 'Registro de salidas',
        link: '/pages/products/output',
      },
      {
        title: 'Listado de salidas',
        link: '/pages/products/output/list',
      },
    ],
  },
  {
    title: 'Usuarios',
    icon: 'person-add-outline',
    link: '/pages/users',
  },
  {
    title: 'Clientes',
    icon: 'people-outline',
    link: '/pages/clients',
  },
  {
    title: 'Pérdidas',
    icon: 'close-square-outline',
    children: [
      {
        title: 'Pérdidas',
        link: '/pages/losing',
      },
      {
        title: 'Ingresar pérdida',
        link: '/pages/losing/create',
      },
      ],
  },
  {
    title: 'Reportes',
    icon: 'alert-triangle-outline',
    children: [
      {
        title: 'Exactitud de inventario',
        link: '/pages/reports/inventory-precision',
      },
      {
        title: 'Rotación de inventario',
        link: '/pages/reports/inventory-rotation',
      },
    ],
  },
];


