# frozen_string_literal: true

json.array! @products do |product|
  json.id product.id
  json.title product.title
  json.description product.description
  json.price product.price
end
