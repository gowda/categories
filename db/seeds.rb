(0..10).map { |n| Category.create!(label: "Root label #{n}") }

(0..10).map do |n|
  Category.all.sample.create_child(label: "Non-root label #{n}")
end

(0..100).map do |n|
  Category.all.sample.create_product(
    title: "Title #{n}",
    description: "Description #{n}",
    price: "INR #{n}"
  )
end
