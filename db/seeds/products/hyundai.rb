# frozen_string_literal: true

require 'product_seed'

class Hyundai < ProductSeed
  def self.load
    new('hyundai').load
  end
end
