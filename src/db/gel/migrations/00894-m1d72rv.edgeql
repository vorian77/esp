CREATE MIGRATION m1d72rvvqlmb3iij5udbqrnmqwk2r6mrzgxmkopnxsvirxx5ja4mtq
    ONTO m1ovj4dy574rborbdid36odz5z53tbwkh4v62azdbcizlddbq33o5q
{
  CREATE FUNCTION sys_user::getUserAction(name: std::str) -> OPTIONAL sys_user::SysUserAction USING (SELECT
      sys_user::SysUserAction
  FILTER
      (.name = name)
  );
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY customColActionMethod;
      DROP PROPERTY customColActionType;
  };
};
