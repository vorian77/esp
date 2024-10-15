CREATE MIGRATION m16yf4kemllifxocior2yg3ofuu27u4m4xm5qjsr5qc7or5qu2tnhq
    ONTO m1ph5apkci5cpo3ik3mspayd6jq4ljq3vkveqjlffgosbw6rrjdt7a
{
  ALTER TYPE sys_core::SysCode {
      CREATE LINK createdBy: sys_user::SysUser;
  };
  ALTER TYPE sys_core::SysCode {
      CREATE LINK modifiedBy: sys_user::SysUser;
  };
  ALTER TYPE sys_core::SysCode {
      CREATE PROPERTY createdAt: std::datetime;
  };
  ALTER TYPE sys_core::SysCode {
      DROP PROPERTY headerOld;
  };
  ALTER TYPE sys_core::SysCode {
      CREATE PROPERTY modifiedAt: std::datetime;
  };
  ALTER TYPE sys_core::SysCode {
      DROP PROPERTY nameOld;
  };
};
