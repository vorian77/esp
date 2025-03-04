CREATE MIGRATION m1akt6ozgv27b6dcw3cdld6jlaeu3cljykfp7sf3ulqwxa3mgbt62a
    ONTO m1ay5e7dggj4246parjl5ljvpxnmc5gmr7xi57gvh2vrthloh3oyia
{
              ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY note: std::str;
  };
  ALTER TYPE app_cm::CmCohort {
      ALTER PROPERTY note {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY noteOld: std::str;
  };
};
