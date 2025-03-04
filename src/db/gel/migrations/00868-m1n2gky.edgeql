CREATE MIGRATION m1n2gky6ruvi46n6y6d7u7brt2fevgfsoicq7xmnovu5fkzjoqfvba
    ONTO m1of3yjz3nyez3lcn3rav74r5zc53br63rrp47xo7r7fm34dl4l7fa
{
  ALTER TYPE app_cm::CmClient {
      CREATE LINK person: default::SysPersonOld;
  };
  ALTER TYPE sys_core::ObjRoot {
      DROP PROPERTY addr1;
      DROP PROPERTY addr2;
      DROP PROPERTY avatar;
      DROP PROPERTY city;
  };
  ALTER TYPE sys_user::SysUser {
      CREATE LINK person: default::SysPersonOld;
  };
};
