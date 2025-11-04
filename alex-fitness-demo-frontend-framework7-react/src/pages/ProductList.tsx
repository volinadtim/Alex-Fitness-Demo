// src/components/ProductList.tsx
import store from '@/js/store';
import { Product } from '@/models/product';
import {
  Block,
  Button,
  Link,
  Navbar,
  Page,
  Preloader,
  Toolbar,
  useStore,
} from 'framework7-react';
import React, { useEffect, useState } from 'react';
import CardView from './CardView';
import ListView from './ListView';
import styles from './ProductList.module.scss';

interface ProductListProps {
  f7router: any;
}

const ProductList: React.FC<ProductListProps> = ({ f7router }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = store;
  const products: Product[] = useStore('products');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      await dispatch('getProducts', {});
    } catch (err) {
      setError('Ошибка при загрузке товаров');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  // const [isSticky, setIsSticky] = useState(true);

  // // Handle scroll for sticky header
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;
  //     setIsSticky(scrollTop > 10);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <Page name="product-list">
      <Navbar title="Каталог товаров" />

      <div className={`${styles.stickyFilterHeader}`}>
        <Toolbar className={styles.viewToggleToolbar}>
          <div className={styles.viewToggle}>
            <Button
              small
              outline={viewMode !== 'card'}
              fill={viewMode === 'card'}
              className={styles.viewButton}
              onClick={() => setViewMode('card')}
            >
              <i className="f7-icons">square_grid_2x2</i>
              Карточки
            </Button>
            <Button
              small
              outline={viewMode !== 'list'}
              fill={viewMode === 'list'}
              className={styles.viewButton}
              onClick={() => setViewMode('list')}
            >
              <i className="f7-icons">list_bullet</i>
              Список
            </Button>
          </div>
        </Toolbar>
      </div>

      <Block>
        {loading && (
          <Block style={{ textAlign: 'center' }}>
            <Preloader size="44px" />
            <p>Загрузка товаров...</p>
          </Block>
        )}

        {error && (
          <Block style={{ textAlign: 'center', color: 'red' }}>
            <p>{error}</p>
            <button
              onClick={loadProducts}
              className="button"
              style={{ marginTop: '16px' }}
            >
              Попробовать снова
            </button>
          </Block>
        )}

        {!loading && !error && products.length === 0 && (
          <Block style={{ textAlign: 'center' }}>
            <p>Товары не найдены</p>
            <button
              onClick={loadProducts}
              className="button"
              style={{ marginTop: '16px' }}
            >
              Обновить
            </button>
          </Block>
        )}

        {!loading &&
          !error &&
          products.length > 0 &&
          (viewMode === 'card' ? (
            <CardView products={products} />
          ) : (
            <ListView products={products} f7router={f7router} />
          ))}
      </Block>

      {/* Кнопка обновления в нижней части */}
      {!loading && (
        <Block style={{ textAlign: 'center' }}>
          <button
            onClick={loadProducts}
            className="button button-outline"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Обновить список'}
          </button>
        </Block>
      )}

      <Block style={{ textAlign: 'center' }}>
        <Link href="/product/new">
          <button className="button" style={{ marginTop: '16px' }}>
            Добавить товар
          </button>
        </Link>
      </Block>
    </Page>
  );
};

export default ProductList;
