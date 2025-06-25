CREATE MIGRATION m1zuqmrxec3d4m7ruseiz724emvz4qehi76suhhji4vvng2vhiba4q
    ONTO m132wadqesg5m5zasnombnnksrrvv7wovo773ve7rmufvin6hua5jq
{
  ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK parms: sys_user::SysUserParm {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
