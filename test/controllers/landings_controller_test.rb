require "test_helper"

class LandingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @landing = landings(:one)
  end

  test "should get index" do
    get landings_url
    assert_response :success
  end

  test "should get new" do
    get new_landing_url
    assert_response :success
  end

  test "should create landing" do
    assert_difference("Landing.count") do
      post landings_url, params: { landing: {  } }
    end

    assert_redirected_to landing_url(Landing.last)
  end

  test "should show landing" do
    get landing_url(@landing)
    assert_response :success
  end

  test "should get edit" do
    get edit_landing_url(@landing)
    assert_response :success
  end

  test "should update landing" do
    patch landing_url(@landing), params: { landing: {  } }
    assert_redirected_to landing_url(@landing)
  end

  test "should destroy landing" do
    assert_difference("Landing.count", -1) do
      delete landing_url(@landing)
    end

    assert_redirected_to landings_url
  end
end
