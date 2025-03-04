CREATE MIGRATION m1ovj4dy574rborbdid36odz5z53tbwkh4v62azdbcizlddbq33o5q
    ONTO m1fhi6jgcbfscw6br2ex56cqayvm6hqkef5dzivhrfxws57sygdfeq
{
  CREATE TYPE sys_core::SysDataObjAction EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK action: sys_user::SysUserAction;
      CREATE LINK codeColor: sys_core::SysCode;
      CREATE REQUIRED PROPERTY isListRowAction: std::bool;
  };
  CREATE TYPE sys_core::SysDataObjActionGroup EXTENDING sys_core::SysObj {
      CREATE MULTI LINK actions: sys_core::SysDataObjAction {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK action: sys_user::SysUserAction;
  };
};
