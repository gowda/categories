# frozen_string_literal: true

require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  def test_create_with_label
    cat = Category.create!(label: 'test label')

    assert_equal cat.parent, '/'
    assert_equal cat.path, '/test label'
  end

  def test_create_with_label_and_parent
    cat = Category.create!(
      label: 'test label',
      parent: '/parent test label'
    )

    assert_equal cat.parent, '/parent test label'
    assert_equal cat.path, '/parent test label/test label'
  end

  def test_create_with_label_parent_and_path
    cat = Category.create!(
      label: 'test label',
      parent: '/parent test label',
      path: '/test path'
    )

    assert_equal cat.parent, '/parent test label'
    assert_equal cat.path, '/test path'
  end

  def test_create_child
    cat = Category.create!(label: 'root label')
    child_cat = cat.create_child(label: 'child label')
    grandchild_cat = child_cat.create_child(label: 'granchild label')

    assert_equal child_cat.parent, cat.path
    assert_equal child_cat.path, "#{cat.path}/#{child_cat.label}"

    assert_equal grandchild_cat.parent, child_cat.path
    assert_equal grandchild_cat.path,
                 "#{child_cat.path}/#{grandchild_cat.label}"
  end

  def test_query_child
    cat = Category.create!(label: 'root label')

    assert_equal cat.children.to_a, []

    cat_children = (1..5).map do |n|
      cat.create_child(label: "child label #{n}")
    end

    ocat = Category.create!(label: 'other root label')
    ocat_children = (1..5).map do |n|
      ocat.create_child(label: "other child label #{n}")
    end

    assert_equal cat.children.to_a, cat_children
    assert_equal ocat.children.to_a, ocat_children

    cat_grandchildren = cat_children.map.with_index do |child, n|
      child.create_child(label: "grancchild label #{n}")
    end

    ocat_grandchildren = ocat_children.map.with_index do |child, n|
      child.create_child(label: "other grancchild label #{n}")
    end

    assert_equal cat.children.to_a, cat_children
    assert_equal ocat.children.to_a, ocat_children

    assert_equal cat.descendants.to_a,
                 cat_children.concat(cat_grandchildren)
    assert_equal ocat.descendants.to_a,
                 ocat_children.concat(ocat_grandchildren)
  end

  def test_create_product
    cat = Category.create!(label: 'root label')
    product = cat.create_product(
      title: 'product title',
      description: 'production description',
      price: 'product price'
    )

    assert_equal cat.products.to_a, [product]
  end
end
