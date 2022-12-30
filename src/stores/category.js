import { defineStore } from 'pinia'

export const categoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [
      {
        id: 1,
        name: 'Digital Content',
        status: 'active',
        highlighted: false,
      },
      {
        id: 2,
        name: 'Electronics',
        status: 'active',
        highlighted: false,
      },
      {
        id: 3,
        name: 'Arts & Crafts',
        status: 'active',
        highlighted: false,
      },
      {
        id: 4,
        name: 'Automotive',
        status: 'active',
        highlighted: false,
      },
      {
        id: 5,
        name: 'Fashion',
        status: 'active',
        highlighted: false,
      },
      {
        id: 6,
        name: 'Home & Kitchen',
        status: 'active',
        highlighted: false,
      },
      {
        id: 7,
        name: 'Pet supplies',
        status: 'active',
        highlighted: false,
      },
      {
        id: 8,
        name: 'Sports and Outdoors',
        status: 'active',
        highlighted: false,
      },
      {
        id: 9,
        name: 'Tools & Home Improvements',
        status: 'active',
        highlighted: false,
      },
      {
        id: 10,
        name: 'Toys & Games',
        status: 'active',
        highlighted: false,
      },
      {
        id: 11,
        name: 'Video Games',
        status: 'active',
        highlighted: false,
      },
    ],
  }),
})
