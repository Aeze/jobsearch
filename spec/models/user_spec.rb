require 'spec_helper'

describe User do

  describe 'validations' do

    user1 = FactoryGirl.build(:user, username: 'testaman', email: 'asdf@asdf.com')

    it 'is invalid without a username' do
      expect(FactoryGirl.build(:user, username: '')).to be_invalid
    end
    it 'is invalid without an email' do
      expect(FactoryGirl.build(:user, email: '')).to be_invalid
    end
    it 'is invalid without a password' do
      expect(FactoryGirl.build(:user, password: '')).to be_invalid
    end

    it 'is invalid with a duplicate username' do
      expect(FactoryGirl.build(:user, username: 'testaman', email: 'test@boom.com')).to be_invalid
    end

    it 'is invalid with a duplicate email' do
      expect(FactoryGirl.build(:user, username: 'bestaman', email: 'asdf@asdf.com')).to be_invalid
    end

  end

end
