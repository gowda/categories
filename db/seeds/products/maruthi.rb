# frozen_string_literal: true

require 'product_seed'

class Maruthi < ProductSeed
  def self.load
    new('maruthi').load
  end
end
