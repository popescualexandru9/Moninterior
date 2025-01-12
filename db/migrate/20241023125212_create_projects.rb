# frozen_string_literal: true

# Create projects table
class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :brief

      t.timestamps
    end
  end
end
