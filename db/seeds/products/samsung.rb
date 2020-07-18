# frozen_string_literal: true

require 'product_seed'

class Samsung < ProductSeed
  def self.load
    new('samsung').load
  end
end
