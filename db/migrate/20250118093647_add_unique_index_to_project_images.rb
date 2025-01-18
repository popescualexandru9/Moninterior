# frozen_string_literal: true

# Add unique index to project_images name scoped to project_id
class AddUniqueIndexToProjectImages < ActiveRecord::Migration[7.1]
  def change
    add_index :project_images, %i[project_id name], unique: true
  end
end
