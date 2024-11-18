CREATE MIGRATION m13mtwy2dol2hn6htkoih3dbxa7pjprthxvnhx45ijpkssxenvsi5a
    ONTO m12eidbd4ccylkx5rafadir5ski5mykczs4b4ea5m2tru6td3gagaa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY items;
  };
  CREATE TYPE sys_core::SysDataObjColumnItem {
      CREATE REQUIRED PROPERTY data: std::str;
      CREATE REQUIRED PROPERTY display: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK items: sys_core::SysDataObjColumnItem;
  };
};
