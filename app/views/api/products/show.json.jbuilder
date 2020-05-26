# frozen_string_literal: true

json.id @product.id.to_s
json.call(@product, :title, :description, :price)
