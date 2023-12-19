require "test_helper"

module Api
  class PlacesControllerTest < ActionDispatch::IntegrationTest
    test "it returns places the match search term is empty" do
      #Create a place
      place = FactoryBot.create(:place)
      puts place

      # Hit an endpoint and see if the response is correct.
      # get "/api/places?search_term=&sort_column=name&sort_order=asc"
      get "/api/places?search="
      parsed_body = JSON.parse(response.body)
      expected_response = (
        {
          places: [
            {
              name: place.name,
              city: place.city,
              most_recent_download_speed: nil,
              most_recent_download_speed_units: nil,
              number_of_measurements: 0
            }.stringify_keys
          ]
        }.stringify_keys
      )

      assert_equal expected_response, parsed_body
    end

    test "it returns all places if search term is set" do
      place1 = FactoryBot.create(:place, name: "Starbucks")
      place2 = FactoryBot.create(:place, name: "Uncle Bob's Cafe")

      get "/api/places?search_term=Bob"
      parsed_body = JSON.parse(response.body)

      expected_response = (
        {
          places: [
            {
              name: place2.name,
              city: place2.city,
              most_recent_download_speed: nil,
              most_recent_download_speed_units: nil,
              number_of_measurements: 0
            }.stringify_keys
          ]
        }.stringify_keys
      )

      assert_equal expected_response, parsed_body
    end
  end
end
