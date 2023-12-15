module Api
  class PlacesController < ApplicationController
    def index
      places = Place.all.map do |place|
        {
          name: place.name,
          city: place.city,
          most_recent__download_speed: most_recent__download_speed(place),
          most_recent_download_speed_unit: most_recent_download_speed_unit(place),
          number_measurements: number_measurements(place)
        }

        render(json: { places: places })
      end
    end

    def most_recent__download_speed(place)
      #Assume that all units are the same
      place.internet_speeds.order("created_at").last.download_speed
    end

    def most_recent_download_speed_unit(place)
      place.internet_speeds.order("created_at").last.download_units
    end

    def number_measurements(place)
      place.internet_speeds.count
    end
  end
end