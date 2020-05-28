# frozen_string_literal: true

vehicles_category = Category.create!(label: 'Vehicles')
cars_category = vehicles_category.create_child(label: 'Cars')
hyundai_category = cars_category.create_child(label: 'Hyundai')
hyundai_category.create_product(
  title: 'Santro',
  description: "India's favourite family car",
  price: 'INR 5.53'
)
hyundai_category.create_product(
  title: 'i20',
  description: "India's favourite bachelor car",
  price: 'INR 8.40'
)

maruthi_category = cars_category.create_child(label: 'Maruthi')
maruthi_category.create_product(
  title: 'Swift',
  description: 'Great ride and handling',
  price: 'INR 5.19 Lakh'
)
maruthi_category.create_product(
  title: 'Alto',
  description: "Let's go!",
  price: 'INR 3.90 Lakh'
)

bikes_category = vehicles_category.create_child(label: 'Bikes')
bajaj_category = bikes_category.create_child(label: 'Bajaj')
bajaj_category.create_product(
  title: 'm80',
  description: 'Ever red!',
  price: 'INR 28,000'
)
bajaj_category.create_product(
  title: 'Pulsar',
  description: 'Was trending before twitter',
  price: 'INR 80,000'
)

hero_category = bikes_category.create_child(label: 'Hero')
hero_category.create_product(
  title: 'Splendor',
  description: 'Make marriages happen',
  price: 'INR 32,000'
)
hero_category.create_product(
  title: 'CBZ',
  description: 'It was',
  price: 'INR 67,000'
)

mobiles_category = Category.create!(label: 'Mobiles')

samsung_category = mobiles_category.create_child(label: 'Samsung')
samsung_category.create_product(
  title: 'Galaxy S10+',
  description: 'Ultra',
  price: 'INR 70,000'
)
samsung_category.create_product(
  title: 'Galaxy Note 10',
  description: 'Aura Black',
  price: 'INR 41,000'
)

apple_category = mobiles_category.create_child(label: 'Apple')
apple_category.create_product(
  title: 'iPhone 8',
  description: 'Best iPhone then',
  price: 'INR 20,000'
)
apple_category.create_product(
  title: 'iPhone X',
  description: 'Best iPhone last year',
  price: 'INR 42,000'
)
apple_category.create_product(
  title: 'iPhone XR',
  description: 'Best iPhone yet',
  price: 'INR 49,000'
)
