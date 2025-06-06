CREATE MIGRATION m1ydxfjiao4rn2ojhoyuoiryhqp4eiqwlhpxgbptaoskx2utrjxwza
    ONTO m136hk6uwn2r2acd6yekqtmmtweytofii2xgnttwy2lfs46zzzhaza
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY exprStyle: std::str;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY exprStyle: std::str;
  };
};
