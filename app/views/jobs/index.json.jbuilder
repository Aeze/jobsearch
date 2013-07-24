json.array!(@jobs) do |jobs|
  json.id jobs.id
  json.name jobs.name
  json.city jobs.city
  json.country jobs.country
  json.latitude jobs.latitude.to_s
  json.longitude jobs.longitude.to_s
end

