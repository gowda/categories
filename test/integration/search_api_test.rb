# frozen_string_literal: true

require 'test_helper'

class SearchAPITest < ActionDispatch::IntegrationTest
  attr_reader :headers, :cats

  def setup
    @headers = {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }

    @cats = (0...10).map do |n|
      Category.create!(label: "root label #{n}")
    end

    @cats.map.with_index do |cat, n|
      cat.create_product(
        title: "product title #{n}",
        description: "product description #{n}",
        price: "product price #{n}"
      )
    end
  end

  def test_search_with_blank_query
    get '/api/search', params: { q: '' }, headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    assert_equal [], data
  end

  def test_search_with_query
    (0...5).map do |n|
      cats.sample.create_product(
        title: "interesting product title #{n}",
        description: "product description #{n}",
        price: "product price #{n}"
      )
    end
    (0...5).map do |n|
      cats.sample.create_product(
        title: "product title #{n}",
        description: "interesting product description #{n}",
        price: "product price #{n}"
      )
    end

    get '/api/search',
        params: { q: 'interesting' },
        headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    data.each do |product|
      assert_match(/interesting/,
                   "#{product['title']} #{product['description']}")
    end
  end
end
