CREATE MIGRATION m1s7bttqfkbpuxr7k7env22dtwtyqjbagljhxlpdtp2w3x6l5q73oa
    ONTO m1h4wvqtv3fjbg4q7hz7qfzdunyluw4p4ytq44glxyiozwkesulgmq
{
  ALTER TYPE app_cm::CmCourse {
      DROP PROPERTY descriptionOld;
  };
  ALTER TYPE sys_migr::SysMigr {
      DROP PROPERTY descriptionOld;
  };
  ALTER TYPE sys_rep::SysAnalytic {
      DROP PROPERTY descriptionOld;
  };
  ALTER TYPE sys_rep::SysRep {
      DROP PROPERTY descriptionOld;
  };
  ALTER TYPE sys_user::SysTask {
      DROP PROPERTY descriptionOld;
  };
};
