const asset = (p) => `${import.meta.env.BASE_URL}assets/${p}`

export const projects = [
  {
    id: 'smolny',
    label: 'SMOLNIY',
    title: 'SMOLNIY',
    designer: 'Cartelle Design',
    tags: ['Шпон ореха', 'Латунь', 'Столярное дело'],
    description:
      'Тёмные апартаменты в историческом центре. Мебель из ореха с латунными деталями, крупные формы под масштаб помещения.',
    cover: asset('projects/smolny-1.jpg'),
    coverRatio: 1.279,
    gallery: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => asset(`projects/smolny-${n}.jpg`)),
  },
  {
    id: 'mrwhite',
    label: 'MR WHITE',
    title: 'MR WHITE',
    designer: 'Cartelle Design',
    tags: ['Светлый дуб', 'Минимализм'],
    description:
      'Светлые апартаменты в дубе. Простые плоскости, аккуратные столярные узлы и минимум деталей.',
    cover: asset('projects/mrwhite-14.jpg'),
    coverRatio: 1.715,
    gallery: [14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) =>
      asset(`projects/mrwhite-${n}.jpg`),
    ),
  },
  {
    id: 'royalpark',
    label: 'ROYAL PARK',
    title: 'ROYAL PARK',
    designer: 'GN Design',
    tags: ['Тёмный шпон', 'Кожа', 'Латунь'],
    description:
      'Кухня-гостиная в тёмном шпоне с классическим декором. Графитовые фасады, кожаные сиденья и латунные детали.',
    cover: asset('projects/royalpark-1.jpg'),
    coverRatio: 1.333,
    gallery: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => asset(`projects/royalpark-${n}.jpg`)),
  },
  {
    id: 'privilegia',
    label: 'PRIVELEGIA',
    title: 'PRIVELEGIA',
    designer: 'GN Design',
    tags: ['Массив и шпон', 'Кожа', 'Латунь'],
    description:
      'Гостиная с реечными деревянными панелями и встроенными стеллажами. Кожаные кресла, тёплый шпон, спокойная палитра.',
    cover: asset('projects/privilegia-1.jpg'),
    coverRatio: 1.334,
    gallery: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => asset(`projects/privilegia-${n}.jpg`)),
  },
  {
    id: 'avatar',
    label: 'AVATAR',
    title: 'AVATAR',
    designer: null,
    tags: ['Шпон ореха', 'Мрамор', 'Латунь'],
    description:
      'Светлая квартира с реечными панелями из ореха и мраморными вставками. Кухня, гардеробные и корпусная мебель собраны единым комплектом, детали — в латуни.',
    cover: asset('projects/avatar-1.jpg'),
    coverRatio: 1.5,
    gallery: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) =>
      asset(`projects/avatar-${n}.jpg`),
    ),
  },
  {
    id: 'premier',
    label: 'PREMIER PALACE',
    title: 'PREMIER PALACE',
    designer: null,
    tags: ['Шпон макассар', 'Латунь', 'Мрамор'],
    description:
      'Квартира с тёмным шпоном макассар и латунными вставками в спальне. Светлая кухня-гостиная, встроенные гардеробные и мраморные санузлы.',
    cover: asset('projects/premier-1.jpg'),
    coverRatio: 1.334,
    gallery: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map(
      (n) => asset(`projects/premier-${n}.jpg`),
    ),
  },
  {
    id: 'sbercity',
    label: 'SBERCITY',
    title: 'SBERCITY',
    designer: null,
    tags: ['Массив', 'Ручная работа'],
    description:
      'Общественное пространство с деревянными павильонами-газебо ручного плетения. Светлый массив и мягкие природные формы.',
    cover: asset('projects/sbercity-1.jpg'),
    coverRatio: 1.778,
    focus: '22% center',
    gallery: [1, 2, 3, 4, 5].map((n) => asset(`projects/sbercity-${n}.jpg`)),
  },
]

export const materials = {
  image: asset('material-wood.jpg'),
  caption: 'Дерево · Кожа · Металл',
  heading: ['Материалы, которые', 'служат десятилетиями'],
  intro: 'Работаем с натуральными материалами и не прячем их фактуру за отделкой.',
  items: [
    {
      name: 'Массив и шпон',
      text: 'Шпон натуральный, искусственный и дизайнерский, массив ценных пород. Подбор текстуры, ручная резьба, точные сопряжения.',
    },
    {
      name: 'Кожа и фурнитура',
      text: 'Натуральная кожа на фасадах, сиденьях и вставках. Ход каждой двери и ящика доверен фурнитуре Blum.',
    },
    {
      name: 'Металлы',
      text: 'Латунь, бронза, медь и нержавеющая сталь: профили, вставки и кромки в деталях интерьера.',
    },
  ],
}

export const steps = [
  {
    n: '01',
    title: 'Проект',
    text: 'Конструкторская разработка любой сложности. Просчитываем каждый узел заранее — до первой детали.',
  },
  {
    n: '02',
    title: 'Материал',
    text: 'Подбор массива, шпона, кожи и фурнитуры — только надёжное и долговечное.',
  },
  {
    n: '03',
    title: 'Производство',
    text: 'Полный цикл на собственном участке. Столярное ремесло и цифровая точность в одних руках.',
  },
  {
    n: '04',
    title: 'Монтаж',
    text: 'Доставка и установка по России и Европе. Финальная подгонка — по месту.',
  },
]

export const about = {
  lead:
    'KULTURA начиналась в 2007 году как небольшая мастерская по обработке акрилового камня. Сегодня это мебельное производство полного цикла: конструкторское бюро, столярный цех, сборка, покрытие и упаковка — всё под одной крышей.',
  facts: [
    { value: 2007, from: 1985, suffix: '', label: 'Год основания мастерской' },
    { value: 20, from: 0, suffix: '+', label: 'Лет опыта у каждого мастера' },
    { value: 100, from: 0, suffix: '%', label: 'Собственное производство полного цикла' },
  ],
  note: 'Одни из первых обработчиков акрилового камня на Северо-Западе.',
}

export const contacts = {
  phones: ['+7 (911) 927-02-10'],
  email: 'info@kltr.ru',
  address: 'Санкт-Петербург, Уральская ул., д. 4в',
  hours: 'Пн–Пт · 09:00–18:00',
}
