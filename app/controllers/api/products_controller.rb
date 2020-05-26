# frozen_string_literal: true

module Api
  class ProductsController < ApplicationController
    before_action :find_category

    def index
      @products = @category.products.page(params[:page])
    end

    def show
      @product = @category.products.find(params[:id])
    end

    def create
      @product = @category.products.create!(product_params)

      render :show, status: 201
    end

    private

    def product_params
      params.permit(:title, :description, :price)
    end

    def find_category
      @category = Category.find(params[:category_id])
    end
  end
end
