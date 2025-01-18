# Add position to projects and project images
class AddPositionToProjectsAndImages < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :position, :integer
    add_column :project_images, :position, :integer
  end
end
