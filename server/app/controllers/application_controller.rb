class ApplicationController < ActionController::API
	before_filter :cors_set_access_control_headers

	def cors_set_access_control_headers
	  headers['Access-Control-Allow-Origin'] = '*'
	  headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
	  headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
	end
end
