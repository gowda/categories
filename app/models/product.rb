# frozen_string_literal: true

class Product
  include Mongoid::Document

  field :title, type: String
  field :description, type: String
  field :price, type: String

  field :categories, type: Array, default: []

  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true

  index title: 'text', description: 'text'

  def self.search(query)
    where('$text' => { '$search' => query.to_s })
  end

  def add_category(category)
    push(categories: [category.path])
  end
end
