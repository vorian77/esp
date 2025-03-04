CREATE MIGRATION m1nfkpnnhj2ienmlqijufy2zb5mo3uhjulw4pmwld47llisg35kxdq
    ONTO m14hu3l5j37itlgpwuj7ywrhbtiktiu57nyk5s7ak5z45owgnddpxa
{
          CREATE TYPE sys_core::SysDataObjFieldListItemsProp {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY label: std::str;
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE LINK props: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
