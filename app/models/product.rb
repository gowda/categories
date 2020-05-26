# frozen_string_literal: true

class Product
  include Mongoid::Document

  field :title, type: String
  field :description, type: String
  field :price, type: String

  embedded_in :category, class_name: 'Category', inverse_of: :products

  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true
end
