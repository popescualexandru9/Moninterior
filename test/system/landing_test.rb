# frozen_string_literal: true

require 'application_system_test_case'

class LandingTest < ApplicationSystemTestCase
  setup do
    @landing = landing(:one)
  end

  test 'visiting the index' do
    visit landing_url
    assert_selector 'h1', text: 'Landing'
  end

  test 'should create landing' do
    visit landing_url
    click_on 'New landing'

    click_on 'Create Landing'

    assert_text 'Landing was successfully created'
    click_on 'Back'
  end

  test 'should update Landing' do
    visit landing_url(@landing)
    click_on 'Edit this landing', match: :first

    click_on 'Update Landing'

    assert_text 'Landing was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Landing' do
    visit landing_url(@landing)
    click_on 'Destroy this landing', match: :first

    assert_text 'Landing was successfully destroyed'
  end
end
