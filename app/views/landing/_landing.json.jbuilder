# frozen_string_literal: true

json.extract! landing, :id, :created_at, :updated_at
json.url landing_url(landing, format: :json)
