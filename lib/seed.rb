# frozen_string_literal: true

class Seed
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def load
    records.each do |record|
      model_class.create!(record)
    end
  end

  def records
    JSON.parse(file_data)
  end

  def file_data
    File.read(file_path)
  end

  def file_path
    [file_singular_path, file_plural_path].find do |file|
      File.exist?(file)
    end
  end

  def file_singular_path
    _expanded_path(name)
  end

  def file_plural_path
    _expanded_path(name.pluralize)
  end

  def model_class
    name.capitalize.constantize
  end

  private

  def _expanded_path(name)
    File.expand_path(
      "db/seeds/data/#{name}.json",
      Rails.root
    )
  end
end
