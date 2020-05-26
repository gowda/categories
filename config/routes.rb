# frozen_string_literal: true

Rails.application.routes.draw do
  match '*path', to: 'format_handling#show', via: :all, constraints: ->(req) { req.format != :json }

  namespace :api do
    constraints format: :json do
      resources :categories, only: %i[index show create] do
        resources :products, only: %i[index show create]

        post '/children', to: 'categories#create_child'
      end

      get '/search', to: 'products#search'
    end
  end
end
