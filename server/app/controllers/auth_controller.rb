class AuthController < ApplicationController
	def login
		p params
		# user = User.find_by(email: params[:email])
		# if user.authenticate(params[:password])
		# 	console.log('asmakdmae')
		# end
	end
end
