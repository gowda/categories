# frozen_string_literal: true

require 'test_helper'

class CategoriesAPITest < ActionDispatch::IntegrationTest
  attr_reader :headers

  def setup
    @headers = {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }
  end

  def test_index_for_blank_database
    get '/api/categories', headers: headers

    data = JSON.parse(response.body)

    assert_equal [], data
  end

  def test_index_for_few_categories_in_database
    cats = (0...20).map { |n| Category.create!(label: "label #{n}") }

    get '/api/categories', headers: headers

    data = JSON.parse(response.body)

    assert_equal 20, data.length

    cats.map do |cat|
      cat.create_child(label: "child #{cat.label}")
    end

    get '/api/categories', headers: headers

    data = JSON.parse(response.body)

    assert_equal 20, data.length
    data.each do |cat|
      refute_match(/child/, cat['label'])
    end
  end

  def test_show_for_non_existent
    get '/api/categories/non-existent-id', headers: headers

    assert_response :not_found
  end

  def test_show_for_existing
    label = 'test label'
    cat = Category.create!(label: label)

    get "/api/categories/#{cat.id}", headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    assert_equal label, data['label']
  end

  def test_create_with_blank
    post '/api/categories', headers: headers

    assert_response :unprocessable_entity

    data = JSON.parse(response.body)

    assert_equal 'Validation failed', data['message']
    assert_equal ["can't be blank"], data['errors']['label']
  end

  def test_create_with_valid
    label = 'test label'

    post '/api/categories',
         params: { label: label }.to_json,
         headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    refute_blank data['id']
    assert_equal label, data['label']
    assert_equal "/#{label}", data['path']
  end

  def test_create_children_for_non_existent
    post '/api/categories/non-existent/children', headers: headers

    assert_response :not_found
  end

  def test_create_children_with_blank
    cat = Category.create!(label: 'test label')

    post "/api/categories/#{cat.id}/children", headers: headers

    assert_response :unprocessable_entity

    data = JSON.parse(response.body)

    assert_equal 'Validation failed', data['message']
    assert_equal ["can't be blank"], data['errors']['label']
  end

  def test_create_children_with_valid
    cat = Category.create!(label: 'test label')

    label = 'test child label'

    post "/api/categories/#{cat.id}/children",
         params: { label: label }.to_json,
         headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    refute_blank data['id']
    assert_equal label, data['label']
    assert_equal "#{cat.path}/#{label}", data['path']
  end

  def test_children_index_for_non_existent_parent
    get '/api/categories/non-existent/children', headers: headers

    assert_response :not_found
  end

  def test_children_index_when_none_present
    cat = Category.create!(label: 'test label')

    get "/api/categories/#{cat.id}/children", headers: headers

    assert_response :success

    data = JSON.parse(response.body)

    assert_equal [], data
  end

  def test_children_index_when_few_present
    cat = Category.create!(label: 'test label')
    (0...20).map do |n|
      cat.create_child(label: "child label #{n}")
    end

    get "/api/categories/#{cat.id}/children", headers: headers

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
