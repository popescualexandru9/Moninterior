require "test_helper"

class LandingControllerTest < ActionDispatch::IntegrationTest
  setup do
    @landing = landing(:one)
  end

  test "should get index" do
    get landing_url
    assert_response :success
  end

  test "should get new" do
    get new_landing_url
    assert_response :success
  end

  test "should create landing" do
    assert_difference("Landing.count") do
      post landing_url, params: { landing: {  } }
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

    assert_redirected_to landing_url
  end
end
