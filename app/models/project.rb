# frozen_string_literal: true

# Project model representing a construction or renovation project
class Project < ApplicationRecord
  has_many :project_images, dependent: :destroy
end
