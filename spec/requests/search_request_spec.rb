# frozen_string_literal: true

describe 'Product search' do
  let!(:categories) do
    (0..10).map { |n| Category.create!(label: "root label #{n}") }
  end

  let!(:descendants) do
    (0..10).map do |n|
      Category.all.sample.create_child(label: "descendant label #{n}")
    end
  end

  let!(:products) do
    (0..100).map do |n|
      Category.all.sample.create_product(
        title: "title #{n}",
        description: "description #{n}",
        price: "price #{n}"
      )
    end
  end

  context 'with blank query' do
    it 'returns nothing' do
      get '/api/search',
          params: { q: '' },
          headers: { 'Accept' => 'application/json' }

      expect(JSON.parse(response.body)).to be_an(Array)
      expect(JSON.parse(response.body)).to be_empty
    end
  end

  context 'with query' do
    let!(:interesting_title_products) do
      (0..5).map do |n|
        Category.all.sample.create_product(
          title: "interesting title #{n}",
          description: "description #{n}",
          price: "price #{n}"
        )
      end
    end

    let!(:interesting_description_products) do
      (0..5).map do |n|
        Category.all.sample.create_product(
          title: "title #{n}",
          description: "interesting description #{n}",
          price: "price #{n}"
        )
      end
    end

    it 'returns results which match query' do
      get '/api/search',
          params: { q: 'interesting' },
          headers: { 'Accept' => 'application/json' }

      expect(JSON.parse(response.body)).to be_an(Array)
      expect(JSON.parse(response.body).length).to eql(12)

      JSON.parse(response.body).each do |product|
        expect(/interesting/).to match(product['title']).or match(product['description'])
      end
    end
  end
end
