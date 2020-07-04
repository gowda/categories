# frozen_string_literal: true

require 'test_helper'

class ProductsAPITest < ActionDispatch::IntegrationTest
  attr_reader :headers, :cat

  def setup
    @headers = {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }

    @cat = Category.create!(label: 'root category')
  end

  def test_create_with_blank
    post '/api/products', headers: headers

    assert_response :unprocessable_entity

    data = JSON.parse(response.body)

    assert_equal 'Validation failed', data['message']
    assert_equal ["can't be blank"], data['errors']['title']
    assert_equal ["can't be blank"], data['errors']['description']
    assert_equal ["can't be blank"], data['errors']['price']
  end

  def test_create_with_valid
    title = 'test product title'
    description = 'test product description'
    price = 'test product price'
    post '/api/products',
         params: {
           title: title,
           description: description,
           price: price
         }.to_json,
         headers: headers

    assert_response :created

    data = JSON.parse(response.body)

    refute_blank data['id']
    assert_equal title, data['title']
    assert_equal description, data['description']
    assert_equal price, data['price']
    assert_equal [], data['categories']
  end

  def test_create_with_categories
    cats = (0...5).map do |n|
      Category.create!(label: "test label #{n}")
    end
    title = 'test product title'
    description = 'test product description'
    price = 'test product price'
    post '/api/products',
         params: {
           title: title,
           description: description,
           price: price,
           categories: cats.map(&:label)
         }.to_json,
         headers: headers

    assert_response :created

    data = JSON.parse(response.body)

    refute_blank data['id']
    assert_equal title, data['title']
    assert_equal description, data['description']
    assert_equal price, data['price']
    assert_equal cats.map(&:path), data['categories']
  end

  def test_index_when_none_preset
    get "/api/categories/#{cat.id}/products", headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    assert_equal [], data
  end

  def test_index_when_few_present
    (0...20).map do |n|
      cat.create_product(
        title: "product title #{n}",
        description: "product description #{n}",
        price: "product price #{n}"
      )
    end

    get "/api/categories/#{cat.id}/products", headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    assert_equal 20, data.length
  end

  private

  def refute_blank(value)
    refute_equal true, value.blank?,
                 "expected #{value} not to be blank"
  end
end
