# frozen_string_literal: true

# Project model representing a an architectural project
class Project < ApplicationRecord
  acts_as_list

  has_many :project_images, dependent: :destroy
  default_scope { order(position: :asc) }
end
