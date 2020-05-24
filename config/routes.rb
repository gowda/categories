# frozen_string_literal: true

Rails.application.routes.draw do
  match '*path', to: 'format_handling#show', via: :all, constraints: ->(req) { req.format != :json }

  namespace :api do
    constraints format: :json do
      resources :categories, only: %i[index show create]
    end
  end
end
