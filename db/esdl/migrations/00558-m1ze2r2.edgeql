CREATE MIGRATION m1ze2r23nizlvxawfxmp2temmjaxobwukme5gmu3debzqozxmqipya
    ONTO m1h6s37szmxoulytxmgsqqag7o5fuafluj5frnkyrpunpplldnaoca
{
  CREATE TYPE sys_user::SysUserPref {
      CREATE PROPERTY data: std::json;
      CREATE PROPERTY idFeature: std::str;
  };
  ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK prefs: sys_user::SysUserPref {
          ON TARGET DELETE ALLOW;
      };
  };
};
