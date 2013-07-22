class Job < ActiveRecord::Base


  geocoded_by :full_address
  after_validation :geocode

  def full_address
    return self.city + ", " + self.country
  end
end
