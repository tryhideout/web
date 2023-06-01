module Exceptions
  class FirebaseNotUniqueError < StandardError
    def initialize(msg = 'Resource Already Exists', exception_type = 'custom')
      @exception_type = exception_type
      super(msg)
    end
  end
end
