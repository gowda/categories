# frozen_string_literal: true

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  attr_reader :cat

  def setup
    @cat = Category.create!(label: 'test category label')
  end

  def test_product_without_category
    product = Product.create!(
      title: 'product title',
      description: 'production description',
      price: 'product price'
    )

    assert_equal product.categories, []
  end

  def test_product_with_category
    product = Product.create!(
      title: 'product title',
      description: 'production description',
      price: 'product price'
    )

    product.add_category(cat)

    assert_equal product.categories, [cat.path]
  end
end
