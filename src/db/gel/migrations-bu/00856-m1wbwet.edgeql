CREATE MIGRATION m1wbwetoff33lkcoksw7sslea37uwpor5aii4rb5a4c7u6ldcs5w2q
    ONTO m13yuvcqgsc7bavrks6ocqjpza5wfaqilja3p7ij5jlnfishmzkhya
{
  ALTER TYPE sys_core::SysCode {
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::ObjRootCore BEFORE sys_user::Mgmt;
  };
  ALTER TYPE sys_core::SysObj {
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::ObjRootCore BEFORE sys_user::Mgmt;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::ObjRootCore BEFORE sys_user::Mgmt;
  };
  ALTER TYPE sys_core::SysSystem {
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::ObjRootCore BEFORE sys_user::Mgmt;
  };
};
