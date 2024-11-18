CREATE MIGRATION m1aznr6nlfgv2pp2f5z2kd5cwmagk5aakc2vjpljao5bp7wwemengq
    ONTO m132zoibpbuury5cd5ojnqjtipddvbyc4xgwsuweg74ah3p7rd6roa
{
      CREATE ALIAS sys_user::SysUserTypeResourceObjects := (
      SELECT
          sys_core::SysOrg
  );
};
