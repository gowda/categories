# frozen_string_literal: true

json.array! @categories do |category|
  json.id category.id.to_s
  json.label category.label
  json.path category.path
end
