# frozen_string_literal: true

require_relative 'seed'

class ProductSeed < Seed
  def load
    records.each do |record|
      category.create_product(record)
    end
  end

  def category
    @category ||= Category.find_by(label: name.capitalize)
  end

  def model_class
    Product
  end
end
