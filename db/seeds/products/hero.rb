# frozen_string_literal: true

require 'product_seed'

class Hero < ProductSeed
  def self.load
    new('hero').load
  end
end
