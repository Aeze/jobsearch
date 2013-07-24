json.array!(@jobs) do |jobs|
  json.extract! jobs, :name, :city, :country, :latitude, :longitude
  json.url jobs_url(jobs, format: :json)
end
