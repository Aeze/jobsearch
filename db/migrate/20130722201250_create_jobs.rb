class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :name
      t.string :city
      t.string :country
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
