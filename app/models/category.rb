# frozen_string_literal: true

class Category
  include Mongoid::Document

  field :label, type: String

  embeds_many :descendants, class_name: 'Category', cyclic: true

  embeds_many :products, class_name: 'Product', inverse_of: :category

  validates :label, presence: true
end
