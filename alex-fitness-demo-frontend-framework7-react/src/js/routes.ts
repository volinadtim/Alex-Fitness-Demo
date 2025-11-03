import ProductDetail from '@/pages/ProductDetail.js';
import ProductForm from '@/pages/ProductForm.js';
import NotFoundPage from '../pages/404.js';
import ProductList from '../pages/ProductList.js';

const routes = [
  {
    path: '/',
    component: ProductList,
  },
  {
    path: '/product/new',
    component: ProductForm,
  },
  {
    path: '/product/:id',
    component: ProductDetail,
  },
  {
    path: '/product/:id/edit',
    component: ProductForm,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
