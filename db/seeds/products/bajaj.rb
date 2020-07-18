# frozen_string_literal: true

require 'product_seed'

class Bajaj < ProductSeed
  def self.load
    new('bajaj').load
  end
end
