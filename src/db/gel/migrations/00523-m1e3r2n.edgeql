CREATE MIGRATION m1e3r2ns4sbbm3yhylshsy46x34qipduyd77mpjzzmd2lkusst4olq
    ONTO m1hwzdrptoelbpjsrpyxf26eqaxxncisgj7wekio3ednz7bzzkjj3q
{
              ALTER TYPE app_cm::CmCohortAttd {
      DROP LINK file;
  };
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE PROPERTY file: std::json;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP LINK file;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE PROPERTY file: std::json;
  };
  ALTER TYPE default::SysPerson {
      DROP LINK avatar;
  };
  ALTER TYPE default::SysPerson {
      CREATE PROPERTY avatar: std::json;
  };
};
