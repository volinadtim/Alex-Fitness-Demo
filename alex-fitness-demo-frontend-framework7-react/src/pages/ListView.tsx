import { Product } from '@/models/product';
import { formatPrice } from '@/utils/format';
import { List, ListItem } from 'framework7-react';

const ListView = ({
  products,
  f7router,
}: {
  products: Product[];
  f7router: any;
}) => {
  // Функция для перехода к деталям товара
  const navigateToProduct = (productId: string | number) => {
    f7router.navigate(`/product/${productId}`);
  };

  return (
    <List mediaList strong dividers>
      {products.map((product) => (
        <ListItem
          key={product.id}
          title={product.name}
          // subtitle={product.description}
          text={`${formatPrice(product.price)}`}
          onClick={() => navigateToProduct(product.id)}
          link={`/product/${product.id}`}
        >
          {
            <img
              slot="media"
              src={product.image_url || '/assets/no-image.webp'}
              alt={product.name}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/no-image.webp';
              }}
            />
          }
        </ListItem>
      ))}
    </List>
  );
};

export default ListView;
