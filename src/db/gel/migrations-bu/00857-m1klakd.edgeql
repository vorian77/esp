CREATE MIGRATION m1klakdgqvssuv3jm55qnx5fwhs2nptb2km6hpbgiho5bwqjcuntyq
    ONTO m1wbwetoff33lkcoksw7sslea37uwpor5aii4rb5a4c7u6ldcs5w2q
{
  ALTER TYPE sys_core::SysCode {
      DROP EXTENDING sys_core::ObjRootCore;
      EXTENDING sys_core::ObjRoot BEFORE sys_user::Mgmt;
  };
  ALTER TYPE sys_core::SysObj {
      DROP EXTENDING sys_core::ObjRootCore;
      EXTENDING sys_core::ObjRoot BEFORE sys_user::Mgmt;
  };
  ALTER TYPE sys_core::SysOrg {
      DROP EXTENDING sys_core::ObjRootCore;
      EXTENDING sys_core::ObjRoot BEFORE sys_user::Mgmt;
  };
  ALTER TYPE sys_core::SysSystem {
      DROP EXTENDING sys_core::ObjRootCore;
      EXTENDING sys_core::ObjRoot BEFORE sys_user::Mgmt;
  };
};
