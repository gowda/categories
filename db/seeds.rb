# frozen_string_literal: true

require_relative 'seeds/categories'
require_relative 'seeds/products'

Categories.load
Products.load
