# frozen_string_literal: true

module Api
  class ProductsController < ApplicationController
    before_action :find_category, only: %i[index show create]

    def meta_index
      @products = Product.all

      render :index
    end

    def index
      @products = @category.all_products.page(params[:page])
    end

    def show
      @product = @category.products.find(params[:id])
    end

    def create
      @product = @category.create_product(product_params)

      render :show, status: 201
    end

    def search
      @products = Product.search(params[:q]).page(params[:page])

      render :index
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
