# frozen_string_literal: true

require 'rails_helper'

describe 'Products', type: :request do
  let!(:category) { Category.create!(label: 'parent category') }

  describe 'GET /api/categories/:category_id/products' do
    context 'when no product is present' do
      it 'returns an empty array' do
        get api_category_products_path(category_id: category.id),
            headers: { 'Accept' => 'application/json' }

        expect(JSON.parse(response.body)).to be_an(Array)
        expect(JSON.parse(response.body)).to be_empty
      end
    end

    context 'when present' do
      let!(:products) do
        (0..20).map do |n|
          category.create_product(
            title: "test title #{n}",
            description: "test description #{n}",
            price: "test price #{n}"
          )
        end
      end

      it 'returns products from first page' do
        get api_category_products_path(category_id: category.id),
            headers: { 'Accept' => 'application/json' }

        expect(JSON.parse(response.body)).to be_an(Array)
        expect(JSON.parse(response.body)).not_to be_empty
        expect(JSON.parse(response.body).length).to eql(21)
      end
    end

    context 'nesting of categories' do
      let!(:category_level_1) { Category.create!(label: 'category level 1 label') }
      let!(:category_level_1a) { Category.create!(label: 'category level 1a label') }
      let!(:category_level_2) { category_level_1.create_child(label: 'category level 2 label') }
      let!(:category_level_3) { category_level_2.create_child(label: 'category level 3 label') }
      let!(:category_level_4) { category_level_3.create_child(label: 'category level 4 label') }
      let!(:category_level_5) { category_level_4.create_child(label: 'category level 5 label') }

      context 'when present' do
        let!(:products) do
          [
            category_level_1,
            category_level_1a,
            category_level_2,
            category_level_3,
            category_level_4,
            category_level_5
          ].map do |category|
            category.create_product(
              title: "test title #{category.label}",
              description: "test description #{category.label}",
              price: "test price #{category.label}"
            )
          end
        end

        context 'at level 1' do
          it 'returns products for category & its subcategories' do
            get api_category_products_path(category_id: category_level_1.id),
                headers: { 'Accept' => 'application/json' }

            expect(JSON.parse(response.body)).to be_an(Array)
            expect(JSON.parse(response.body)).not_to be_empty
            expect(JSON.parse(response.body).length).to eql(5)
          end

          it 'returns does not include products from categories tree' do
            get api_category_products_path(category_id: category_level_1.id),
                headers: { 'Accept' => 'application/json' }

            expect(JSON.parse(response.body)).to be_an(Array)
            expect(JSON.parse(response.body)).not_to be_empty
            JSON.parse(response.body).each do |product|
              expect(product['title']).not_to match(category_level_1a.label)
            end
          end
        end
      end
    end
  end

  describe 'GET /api/categories/:category_id/products/:id' do
    context 'with non-existent id' do
      it 'returns 404' do
        get api_category_product_path(category_id: category.id, id: 'non-existent-id'),
            headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(a_hash_including('message' => 'Not found'))
      end
    end

    context 'when present' do
      let(:product) do
        category.create_product(
          title: 'test title',
          description: 'test description',
          price: 'test price'
        )
      end

      it 'returns the product' do
        get api_category_product_path(category_id: category.id, id: product.id),
            headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(a_hash_including('id' => product.id))
      end
    end
  end

  describe 'POST /api/products' do
    context 'without parameters' do
      it 'returns 422' do
        post api_products_path,
             headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(
          a_hash_including(
            'message' => 'Validation failed',
            'errors' => a_hash_including(
              'title' => ["can't be blank"],
              'description' => ["can't be blank"],
              'price' => ["can't be blank"]
            )
          )
        )
      end
    end

    context 'parameters' do
      context 'when blank' do
        it 'returns 422' do
          post api_products_path,
               params: { title: '', description: '' },
               headers: { 'Accept' => 'application/json' }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)).to be_an(Hash)
          expect(JSON.parse(response.body)).to match(
            a_hash_including(
              'message' => 'Validation failed',
              'errors' => a_hash_including(
                'title' => ["can't be blank"],
                'description' => ["can't be blank"],
                'price' => ["can't be blank"]
              )
            )
          )
        end
      end

      context 'when not blank' do
        it 'creates product' do
          post api_products_path,
               params: {
                 title: 'test title',
                 description: 'test description',
                 price: 'test price'
               },
               headers: { 'Accept' => 'application/json' }

          expect(response).to have_http_status(:created)
          expect(JSON.parse(response.body)).to be_an(Hash)
          expect(JSON.parse(response.body)).to match(
            a_hash_including(
              'id',
              'title' => 'test title',
              'description' => 'test description',
              'price' => 'test price',
              'categories' => []
            )
          )
        end

        context 'categories' do
          context 'non existent' do
            it 'creates product' do
              post api_products_path,
                   params: {
                     title: 'test title',
                     description: 'test description',
                     price: 'test price'
                   },
                   headers: { 'Accept' => 'application/json' }

              expect(response).to have_http_status(:created)
              expect(JSON.parse(response.body)).to be_an(Hash)
              expect(JSON.parse(response.body)).to match(
                a_hash_including(
                  'id',
                  'title' => 'test title',
                  'description' => 'test description',
                  'price' => 'test price',
                  'categories' => []
                )
              )
            end
          end

          context 'valid' do
            let!(:categories) do
              (0..5).map { |n| Category.create!(label: "test label #{n}") }
            end

            it 'creates product' do
              post api_products_path,
                   params: {
                     title: 'test title',
                     description: 'test description',
                     price: 'test price',
                     categories: categories.map(&:label)
                   },
                   headers: { 'Accept' => 'application/json' }

              expect(response).to have_http_status(:created)
              expect(JSON.parse(response.body)).to be_an(Hash)
              expect(JSON.parse(response.body)).to match(
                a_hash_including(
                  'id',
                  'title' => 'test title',
                  'description' => 'test description',
                  'price' => 'test price',
                  'categories' => categories.map(&:path)
                )
              )
            end
          end
        end
      end
    end
  end
end
