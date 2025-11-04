// src/components/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Preloader,
  Button,
  f7,
  Link,
} from 'framework7-react';
import { useStore } from 'framework7-react';
import { Product } from '@/models/product';
import store from '@/js/store';

interface ProductDetailProps {
  f7router: any;
  id: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ f7router, id }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { state, dispatch } = store;

  // Получаем текущий товар из store или ищем в списке
  const product: Product | undefined =
    state.currentProduct || state.products?.find((p) => p.id.toString() === id);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Если товара нет в store, загружаем его
      if (!product) {
        await dispatch('getProduct', id);
      }
    } catch (err) {
      setError('Ошибка при загрузке товара');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(price);
  };

  if (loading) {
    return (
      <Page>
        <Navbar title="Товар" backLink="Назад" />
        <Block style={{ textAlign: 'center' }}>
          <Preloader size="44px" />
          <p>Загрузка товара...</p>
        </Block>
      </Page>
    );
  }

  if (error || !product) {
    return (
      <Page>
        <Navbar title="Товар" backLink="Назад" />
        <Block style={{ textAlign: 'center' }}>
          <p>{error || 'Товар не найден'}</p>
          <Button onClick={loadProduct}>Попробовать снова</Button>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar title={product.name} backLink="Назад" />

      <Block>
        {
          <img
            src={product.image_url || '/assets/no-image.webp'}
            alt={product.name}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: '12px',
              marginBottom: '16px',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/no-image.webp';
            }}
          />
        }

        <BlockTitle style={{ marginTop: '0' }}>{product.name}</BlockTitle>

        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#007aff',
            margin: '16px 0',
          }}
        >
          {formatPrice(product.price)}
        </p>

        {product.description && (
          <div>
            <BlockTitle>Описание</BlockTitle>
            <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
              {product.description}
            </p>
          </div>
        )}

        {/* Дополнительная информация о товаре */}
        <div style={{ marginTop: '24px' }}>
          <a href={`/product/${product.id}/edit`}>
            <Button type="button" large fill style={{ marginBottom: '8px' }}>
              Редактировать
            </Button>
          </a>

          <Button
            large
            outline
            onClick={() => {
              // Назад к списку
              f7router.back();
            }}
          >
            Назад к списку
          </Button>
        </div>
      </Block>
    </Page>
  );
};

export default ProductDetail;
