export const navigation = [
  {
    text: 'Модерация',
    path: '/tasks',
    icon: 'home'
  },
  {
    text: 'Администрирование',
    icon: 'folder',
    items: [
      {
        text: 'Книги',
        path: '/books'
      },
      {
        text: 'Авторы',
        path: '/authors'
      },
      {
        text: 'Жанры',
        path: '/genres'
      }
    ]
  }
];
