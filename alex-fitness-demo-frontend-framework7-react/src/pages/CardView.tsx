import { Product } from '@/models/product';
import { formatPrice } from '@/utils/format';
import { Card, CardContent, Link } from 'framework7-react';

const CardView = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 medium-grid-cols-4 grid-gap">
      {products.map((product) => (
        <a key={product.id} href={`/product/${product.id}`}>
          <Card
            className="product-card"
            style={{ cursor: 'pointer', margin: '16px 0' }}
          >
            <CardContent padding={false}>
              {
                <img
                  src={product.image_url || '/assets/no-image.webp'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                  onError={(e) => {
                    // Fallback изображение при ошибке загрузки
                    (e.target as HTMLImageElement).src =
                      '/assets/no-image.webp';
                  }}
                />
              }
              <div style={{ padding: '16px' }}>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
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
                      textOverflow: 'ellipsis',
                      maxHeight: '20px',
                    }}
                  >
                    {product.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default CardView;
