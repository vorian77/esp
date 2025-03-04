CREATE MIGRATION m1v5gdjsan4hgjh33ausns2hgahrwsjkh763g6g36bhd32dfdna3sq
    ONTO m1zfidngckjskurq6nhbxxmg7woxsdr4z5ogqbc5wlh4apr6i4nyva
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK person {
          ON SOURCE DELETE ALLOW;
      };
  };
  ALTER TYPE default::SysError {
      ALTER LINK user {
          RESET ON SOURCE DELETE;
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
