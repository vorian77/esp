CREATE MIGRATION m1t7gb6t6fjzl3uqizyjdihotpz445clrpaqnxk3s7kbjcb5mb6yda
    ONTO m1zbn72zipezxajf65uqyfnhmxfg4gsnb2bufz7gcebvaq5etchdza
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
