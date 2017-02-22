class UserAuthentication < ActiveRecord::Base
  belongs_to :user

  serialize :params

  def self.create_from_omniauth(params, user)
    token_expires_at = params['credentials']['expires_at'] ? Time.at(params['credentials']['expires_at']).to_datetime : nil
    create!(
      user: user,
      provider: params["provider"],
      uid: params['uid'],
      token: params['credentials']['token'],
      token_expires_at: token_expires_at,
      params: params,
    )
  end
end
