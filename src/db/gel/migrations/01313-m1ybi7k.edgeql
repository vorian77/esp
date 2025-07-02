CREATE MIGRATION m1ybi7ktfjsdoifh7kv35oaexusvfixgzj32tewgsfa4uaet3k6ucq
    ONTO m1mjcfpavrlfxbswiifvt4scwunoqizu7olnmp4scd6uy6egcvi6ua
{
  ALTER TYPE sys_user::SysUser {
      DROP LINK ownerOld;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK ownerOld;
  };
};
