# frozen_string_literal: true

require 'rails_helper'

describe 'Products', type: :request do
  let!(:category) { Category.create!(label: 'parent category') }

  describe 'GET /api/products' do
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
          category.products.create!(
            title: "test title #{n}",
            description: "test description #{n}",
            price: "test price #{n}"
          )
        end
      end

      context 'pagination' do
        it 'returns products from first page' do
          get api_category_products_path(category_id: category.id),
              headers: { 'Accept' => 'application/json' }

          expect(JSON.parse(response.body)).to be_an(Array)
          expect(JSON.parse(response.body)).not_to be_empty
          expect(JSON.parse(response.body).length).to eql(16)
        end

        context 'with page parameter' do
          it 'returns products from the page' do
            get api_category_products_path(category_id: category.id, page: 2),
                headers: { 'Accept' => 'application/json' }

            expect(JSON.parse(response.body)).to be_an(Array)
            expect(JSON.parse(response.body)).not_to be_empty
            expect(JSON.parse(response.body).length).to eql(5)
          end
        end
      end
    end
  end

  describe 'GET /api/products/:id' do
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
        category.products.create!(
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
        post api_category_products_path(category_id: category.id),
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
          post api_category_products_path(category_id: category.id),
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
          post api_category_products_path(category_id: category.id),
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
              'price' => 'test price'
            )
          )
        end
      end
    end
  end
end
