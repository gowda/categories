# frozen_string_literal: true

require 'rails_helper'

describe 'Categories', type: :request do
  describe 'GET /api/categories' do
    context 'when no category is present' do
      it 'returns an empty array' do
        get '/api/categories', headers: { 'Accept' => 'application/json' }

        expect(JSON.parse(response.body)).to be_an(Array)
        expect(JSON.parse(response.body)).to be_empty
      end
    end

    context 'when present' do
      let!(:categories) do
        (0..20).map { |n| Category.create!(label: "test label #{n}") }
      end

      context 'pagination' do
        it 'returns categories from first page' do
          get '/api/categories', headers: { 'Accept' => 'application/json' }

          expect(JSON.parse(response.body)).to be_an(Array)
          expect(JSON.parse(response.body)).not_to be_empty
          expect(JSON.parse(response.body).length).to eql(16)
        end

        context 'with page parameter' do
          it 'returns categories from the page' do
            get '/api/categories', params: { page: 2 }, headers: { 'Accept' => 'application/json' }

            expect(JSON.parse(response.body)).to be_an(Array)
            expect(JSON.parse(response.body)).not_to be_empty
            expect(JSON.parse(response.body).length).to eql(5)
          end
        end
      end
    end
  end

  describe 'GET /api/categories/:id' do
    context 'with non-existent id' do
      it 'returns 404' do
        get '/api/categories/non-existent-id',
            headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(a_hash_including('message' => 'Not found'))
      end
    end

    context 'when present' do
      let(:category) { Category.create!(label: 'test label') }

      it 'returns the category' do
        get "/api/categories/#{category.id}",
            headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(a_hash_including('id' => category.id))
      end
    end
  end

  describe 'POST /api/categories' do
    context 'without parameters' do
      it 'returns 422' do
        post '/api/categories',
             headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(
          a_hash_including(
            'message' => 'Validation failed',
            'errors' => a_hash_including('label' => ["can't be blank"])
          )
        )
      end
    end

    context 'label' do
      context 'when blank' do
        it 'returns 422' do
          post '/api/categories',
               params: { label: '' },
               headers: { 'Accept' => 'application/json' }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)).to be_an(Hash)
          expect(JSON.parse(response.body)).to match(
            a_hash_including(
              'message' => 'Validation failed',
              'errors' => a_hash_including('label' => ["can't be blank"])
            )
          )
        end
      end

      context 'when not blank' do
        it 'creates category' do
          post '/api/categories',
               params: { label: 'test label' },
               headers: { 'Accept' => 'application/json' }

          expect(response).to have_http_status(:created)
          expect(JSON.parse(response.body)).to be_an(Hash)
          expect(JSON.parse(response.body)).to match(
            a_hash_including('id', 'label' => 'test label')
          )
        end
      end
    end
  end

  describe 'POST /api/categories/:id/children' do
    let(:category) { Category.create!(label: 'parent category test label') }

    context 'without parameters' do
      it 'returns 422' do
        post "/api/categories/#{category.id}/children",
             headers: { 'Accept' => 'application/json' }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to be_an(Hash)
        expect(JSON.parse(response.body)).to match(
          a_hash_including(
            'message' => 'Validation failed',
            'errors' => a_hash_including('label' => ["can't be blank"])
          )
        )
      end
    end

    context 'label' do
      context 'when blank' do
        it 'returns 422' do
          post "/api/categories/#{category.id}/children",
               params: { label: '' },
               headers: { 'Accept' => 'application/json' }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)).to be_an(Hash)
          expect(JSON.parse(response.body)).to match(
            a_hash_including(
              'message' => 'Validation failed',
              'errors' => a_hash_including('label' => ["can't be blank"])
            )
          )
        end
      end

      context 'when not blank' do
        it 'creates category' do
          post "/api/categories/#{category.id}/children",
               params: { label: 'test label' },
               headers: { 'Accept' => 'application/json' }

          expect(response).to have_http_status(:created)
          expect(JSON.parse(response.body)).to be_an(Hash)
          expect(JSON.parse(response.body)).to match(
            a_hash_including(
              'id',
              'label' => 'test label'
            )
          )
        end
      end
    end
  end
end
