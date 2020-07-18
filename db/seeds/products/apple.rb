# frozen_string_literal: true

require 'product_seed'

class Apple < ProductSeed
  def self.load
    new('apple').load
  end
end
