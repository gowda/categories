# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'

require_relative '../config/environment'
require 'rails/test_help'

require 'database_cleaner'
require 'minitest/autorun'

DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean_with(:truncation)

module ActiveSupport
  class TestCase
    def setup
      DatabaseCleaner.start
    end

    def teardown
      DatabaseCleaner.clean
    end
  end
end
