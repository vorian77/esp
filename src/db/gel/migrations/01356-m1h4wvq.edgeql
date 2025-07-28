CREATE MIGRATION m1h4wvqtv3fjbg4q7hz7qfzdunyluw4p4ytq44glxyiozwkesulgmq
    ONTO m15dwsytajxats553gurp44f74nexbg2ckf6xap57tjvlvy7jcrlka
{
  ALTER TYPE sys_core::ObjRootCore {
      CREATE PROPERTY description: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      ALTER PROPERTY description {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY descriptionOld: std::str;
  };
  ALTER TYPE sys_migr::SysMigr {
      ALTER PROPERTY description {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY descriptionOld: std::str;
  };
  ALTER TYPE sys_rep::SysAnalytic {
      ALTER PROPERTY description {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY descriptionOld: std::str;
  };
  ALTER TYPE sys_rep::SysRep {
      ALTER PROPERTY description {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY descriptionOld: std::str;
  };
  ALTER TYPE sys_user::SysTask {
      ALTER PROPERTY description {
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY descriptionOld: std::str;
  };
};
