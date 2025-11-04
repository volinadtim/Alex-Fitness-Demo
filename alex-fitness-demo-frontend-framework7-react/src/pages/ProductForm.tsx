// src/components/ProductForm.tsx
import store from '@/js/store';
import { Product } from '@/models/product';
import {
  Block,
  BlockTitle,
  f7,
  List,
  ListButton,
  ListInput,
  Navbar,
  Page,
  Preloader,
} from 'framework7-react';
import React, { useEffect, useState } from 'react';

interface ProductFormProps {
  f7router: any;
  id?: string; // Для режима редактирования
}

const ProductForm: React.FC<ProductFormProps> = ({ f7router, id }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { state, dispatch } = store;

  const [formData, setFormData] = useState<Omit<Product, 'id'> | Product>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    // category: '',
    // inStock: true,
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await dispatch('getProduct', id);
      if (product) {
        setFormData(product);
      }
    } catch (err) {
      setError('Ошибка при загрузке товара');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Введите название товара');
      return false;
    }
    if (formData.price <= 0) {
      setError('Цена должна быть больше 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setError(null);

      if (isEditMode) {
        // Редактирование существующего товара
        await dispatch('updateProduct', formData);
        f7.dialog.alert('Товар успешно обновлен!', () => {
          f7router.back();
        });
      } else {
        // Создание нового товара
        await dispatch('createProduct', formData);
        f7.dialog.alert('Товар успешно создан!', () => {
          f7router.back();
        });
      }
    } catch (err) {
      setError(`Ошибка при ${isEditMode ? 'обновлении' : 'создании'} товара`);
      console.error('Error saving product:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!isEditMode) return;

    f7.dialog.confirm(
      'Вы уверены, что хотите удалить этот товар?',
      'Удаление товара',
      async () => {
        try {
          setSaving(true);
          await dispatch('deleteProduct', id);
          f7.dialog.alert('Товар успешно удален!', () => {
            f7router.back();
          });
        } catch (err) {
          setError('Ошибка при удалении товара');
          console.error('Error deleting product:', err);
        } finally {
          setSaving(false);
        }
      }
    );
  };

  if (loading) {
    return (
      <Page>
        <Navbar
          title={isEditMode ? 'Редактирование' : 'Новый товар'}
          backLink="Назад"
        />
        <Block style={{ textAlign: 'center' }}>
          <Preloader size="44px" />
          <p>Загрузка...</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar
        title={isEditMode ? 'Редактирование товара' : 'Новый товар'}
        backLink="Назад"
      />

      <Block>
        <BlockTitle>Информация о товаре</BlockTitle>

        {error && (
          <Block style={{ color: 'red', textAlign: 'center' }}>{error}</Block>
        )}

        {/* noHairlinesMd */}
        <List
          form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ListInput
            label="Название товара"
            type="text"
            placeholder="Введите название"
            value={formData.name}
            onInput={(e) => handleInputChange('name', e.target.value)}
            required
            clearButton
          />

          <ListInput
            label="Цена"
            type="number"
            placeholder="0.00"
            value={formData.price.toString()}
            onInput={(e) =>
              handleInputChange('price', parseFloat(e.target.value) || 0)
            }
            min="0"
            step="0.01"
            required
          />

          <ListInput
            label="Описание"
            type="textarea"
            placeholder="Описание товара"
            value={formData.description}
            onInput={(e) => handleInputChange('description', e.target.value)}
            resizable
          />

          <ListInput
            label="URL изображения"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.image_url}
            onInput={(e) => handleInputChange('image_url', e.target.value)}
            clearButton
          />

          {/* <ListInput
            label="Категория"
            type="text"
            placeholder="Категория товара"
            value={formData.category}
            onInput={(e) => handleInputChange('category', e.target.value)}
            clearButton
          /> */}

          {/* <li className="item-content item-input">
            <div className="item-inner">
              <div className="item-title item-label">В наличии</div>
              <div className="item-input-wrap">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => handleInputChange('inStock', e.target.checked)}
                  style={{ marginLeft: '8px' }}
                />
              </div>
            </div>
          </li> */}

          <Block>
            <button
              title={isEditMode ? 'Обновить товар' : 'Создать товар'}
              type="submit"
              disabled={saving}
              className="button button-round"
              style={{ marginBottom: '16px' }}
            >
              {/* <ListButton> */}
              {saving ? (
                <Preloader size="20px" style={{ marginRight: '8px' }} />
              ) : null}
              {saving
                ? 'Сохранение...'
                : isEditMode
                ? 'Обновить товар'
                : 'Создать товар'}
              {/* </ListButton> */}
            </button>

            {isEditMode && (
              <button
                title="Удалить товар"
                color="red"
                onClick={handleDelete}
                disabled={saving}
              >
                Удалить товар
              </button>
            )}
          </Block>
        </List>
      </Block>
    </Page>
  );
};

export default ProductForm;
