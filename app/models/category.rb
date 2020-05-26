# frozen_string_literal: true

class Category
  include Mongoid::Document

  field :label, type: String
  field :parent, type: String
  field :path, type: String

  validates :label, presence: true

  before_create :set_parent
  before_create :set_path

  def set_path
    return if attribute_present?(:path)

    assign_attributes(path: "#{parent}/#{label}".gsub(%r{/+}, '/'))
  end

  def set_parent
    return if attribute_present?(:parent)

    assign_attributes(parent: '/')
  end

  def create_child(**attrs)
    Category.create!(**attrs.merge({ parent: path }))
  end

  def children
    Category.where(parent: /^#{path}$/)
  end

  def descendants
    Category.where(parent: /^#{path}/)
  end

  def create_product(attrs)
    Product.create!(attrs.merge(categories: [path]))
  end

  def products
    Product.where(:categories.in => [/^#{path}$/])
  end

  def all_products
    Product.where(:categories.in => [/^#{path}/])
  end
end
