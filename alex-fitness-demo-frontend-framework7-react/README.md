# Alex Fitness Demo

## Техническое задание

### Frontend (Mobile App)

#### Технологии:
- **Framework7** React
- **TypeScript**

#### Функциональность:

1. **Список товаров**
   - Отображение каталога товаров в виде списка или карточек
   - Каждый товар показывает: название, цену и изображение (URL картинки)
   - При клике на товар - переход на страницу детального просмотра

2. **Детальная страница товара**
   - Полная информация о товаре: название, описание, цена
   - Изображение товара
   - Кнопки редактирования и удаления

3. **Создание/редактирование товара**
   - Форма с полями: название (обязательное), описание, цена (обязательное), URL изображения
   - Валидация полей
   - Кнопка "Сохранить"

4. **API интеграция**
   - Получение списка товаров с сервера
   - Получение информации о конкретном товаре
   - Создание товара через API
   - Обновление товара через API
   - Удаление товара через API
   - Обработка ошибок подключения

#### UI/UX требования:
- Использование компонентов Framework7 (ListView, Card, Button, Form, Page)
- Отображение изображений товаров (если URL указан)
- Простой и понятный интерфейс
- Индикатор загрузки при запросах к API


## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production
* 📱 `build-cordova` - build cordova app
* 📱 `build-cordova-ios` - build cordova iOS app
* 📱 `cordova-ios` - run dev build cordova iOS app
* 📱 `build-cordova-android` - build cordova Android app
* 📱 `cordova-android` - run dev build cordova Android app

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.
## Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.



## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)

* [Framework7 React Documentation](https://framework7.io/react/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7