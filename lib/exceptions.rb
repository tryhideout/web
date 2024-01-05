module Exceptions
  class JWTException < StandardError
    def initialize(msg, exception_type = 'custom')
      @exception_type = exception_type
      super(msg)
    end
  end

  class AuthException < StandardError
    def initialize(msg, exception_type = 'custom')
      @exception_type = exception_type
      super(msg)
    end
  end

  class ModelException < StandardError
    def initialize(msg, exception_type = 'custom')
      @exception_type = exception_type
      super(msg)
    end
  end
end
