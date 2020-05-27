# frozen_string_literal: true

module Api
  class CategoriesController < ApplicationController
    before_action :find_parent, only: %i[create_child children_index]

    def index
      @categories = Category.root.page(params[:page])
    end

    def show
      @category = Category.find(params[:id])
    end

    def create
      @category = Category.create!(label: params[:label])

      render :show, status: 201
    end

    def create_child
      @category = @parent.create_child(label: params[:label])

      render :show, status: 201
    end

    def children_index
      @categories = @parent.children.page(params[:page])

      render :index
    end

    private

    def find_parent
      @parent = Category.find(params[:category_id])
    end
  end
end
