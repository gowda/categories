# frozen_string_literal: true

class Category
  include Mongoid::Document

  field :label, type: String

  embeds_many :descendants, class_name: 'Category', cyclic: true

  validates :label, presence: true
end
