CREATE MIGRATION m1mqapgqpogo4v7ng6j4njqe7uxfto74zzmc7iccmvs7efwkue5exa
    ONTO m1nuuhlk3gcheig2yclljh6odpl3ljwgr6gpxqlqddczfmokcb5naq
{
  ALTER TYPE app_cm::CmCohortAttd {
      DROP PROPERTY file;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP PROPERTY file;
  };
  ALTER TYPE default::SysPerson {
      DROP PROPERTY avatar;
  };
  DROP TYPE default::Test;
};
