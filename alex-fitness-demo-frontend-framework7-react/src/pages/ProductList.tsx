// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  Block,
  List,
  ListItem,
  Card,
  CardContent,
  Preloader,
  BlockTitle,
  Link,
  f7,
} from 'framework7-react';
import { useStore } from 'framework7-react';
import { Product } from '@/models/product';
import store from '@/js/store';

interface ProductListProps {
  f7router: any;
}

const ProductList: React.FC<ProductListProps> = ({ f7router }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем store и действия
  const { state, dispatch } = store; // useStore(store, 'products');

  // Получаем товары из store
  const products: Product[] = state.products || [];

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

  // // Функция для перехода к деталям товара
  // const navigateToNewProduct = () => {
  //   f7router.navigate(`/product/new`);
  // };

  // Функция для перехода к деталям товара
  const navigateToProduct = (productId: string | number) => {
    f7router.navigate(`/product/${productId}`);
  };

  // Форматирование цены
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(parseFloat(String(price)));
  };

  // Рендер карточки товара
  const renderProductCard = (product: Product) => (
    <Card
      key={product.id}
      className="product-card"
      //   onClick={() => navigateToProduct(product.id)}
      style={{ cursor: 'pointer', margin: '16px 0' }}
    >
      <CardContent padding={false}>
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
            onError={(e) => {
              // Fallback изображение при ошибке загрузки
              (e.target as HTMLImageElement).src =
                '/images/placeholder-product.jpg';
            }}
          />
        )}
        <div style={{ padding: '16px' }}>
          <h3
            style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}
          >
            {product.name}
          </h3>
          <p
            style={{
              margin: '0',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#007aff',
            }}
          >
            {formatPrice(product.price)}
          </p>
          {product.description && (
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '14px',
                color: '#666',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Рендер элемента списка товара
  const renderProductListItem = (product: Product) => (
    <ListItem
      key={product.id}
      title={product.name}
      subtitle={product.description}
      text={`${formatPrice(product.price)}`}
      onClick={() => navigateToProduct(product.id)}
      link={`/product/${product.id}`}
    >
      {product.imageUrl && (
        <img
          slot="media"
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/images/placeholder-product.jpg';
          }}
        />
      )}
    </ListItem>
  );

  return (
    <Page name="product-list">
      <Navbar title="Каталог товаров" />

      <Block>
        <BlockTitle>Наши товары</BlockTitle>

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

        {/* Вариант 1: Отображение в виде списка */}
        {!loading && !error && products.length > 0 && (
          <List mediaList strong dividers>
            {products.map(renderProductListItem)}
          </List>
        )}

        {/* Вариант 2: Отображение в виде карточек (раскомментируйте для использования) */}
        {/* {!loading && !error && products.length > 0 && (
          <div>
            {products.map(renderProductCard)}
          </div>
        )} */}
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
          <button
            // onClick={navigateToNewProduct}
            className="button"
            style={{ marginTop: '16px' }}
          >
            Добавить товар
          </button>
        </Link>
      </Block>
    </Page>
  );
};

export default ProductList;
