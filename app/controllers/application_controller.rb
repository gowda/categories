# frozen_string_literal: true

class ApplicationController < ActionController::API
  rescue_from Mongoid::Errors::DocumentNotFound do |_exception|
    render json: { message: 'Not found' }, status: 404
  end

  rescue_from Mongoid::Errors::Validations do |exception|
    body = {
      message: 'Validation failed',
      errors: exception.document.errors.messages
    }

    render json: body, status: 422
  end
end
