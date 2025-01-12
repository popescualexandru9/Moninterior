# frozen_string_literal: true

# Migration to create the project_images table
class CreateProjectImages < ActiveRecord::Migration[7.1]
  def change
    create_table :project_images do |t|
      t.references :project, null: false, foreign_key: true
      t.string :name
      t.string :tag

      t.timestamps
    end
  end
end
