# frozen_string_literal: true

require 'seed'

module Categories
  class CategorySeed < Seed
    def initialize
      super('category')
    end

    def records
      super.map { |cat| serialize(cat) }.flatten
    end

    private

    def serialize(category, parent = nil)
      category = category.merge(
        parent ? { parent: parent } : {}
      )
      children = category['categories']

      return [category] if children.nil?

      label = category['label']
      parent = parent ? "#{parent}/#{label}" : "/#{label}"
      [category.except('categories')]
        .concat(
          children.map { |child| serialize(child, parent) }.flatten
        )
    end
  end

  def self.load
    CategorySeed.new.load
  end
end
