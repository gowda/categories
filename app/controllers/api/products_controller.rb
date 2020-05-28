# frozen_string_literal: true

module Api
  class ProductsController < ApplicationController
    before_action :find_category, only: %i[index show]

    def meta_index
      @products = Product.all

      render :index
    end

    def index
      @products = @category.all_products
    end

    def show
      @product = @category.products.find(params[:id])
    end

    def create
      attrs = product_params.then do |p|
        categories = if p[:categories]
                       Category.where(:label.in => p[:categories]).map(&:path)
                     else
                       []
                     end

        p.merge(categories: categories)
      end

      @product = Product.create!(attrs)

      render :show, status: 201
    end

    def search
      @products = Product.search(params[:q])

      render :index
    end

    private

    def product_params
      params.permit(:title, :description, :price, categories: [])
    end

    def find_category
      @category = Category.find(params[:category_id])
    end
  end
end
