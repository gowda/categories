# frozen_string_literal: true

module Api
  class CategoriesController < ApplicationController
    def index
      @categories = Category.page(params[:page])
    end

    def show
      @category = Category.find(params[:id])
    end

    def create
      @category = Category.create!(label: params[:label])

      render :show, status: 201
    end
  end
end
