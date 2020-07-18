# frozen_string_literal: true

class Products
  def self.load
    new.load
  end

  def load
    Category.all.each do |category|
      name = category.label.downcase
      require_relative "products/#{name}"

      class_name = name.capitalize.constantize
      class_name.load
    rescue LoadError
      next
    end
  end
end
