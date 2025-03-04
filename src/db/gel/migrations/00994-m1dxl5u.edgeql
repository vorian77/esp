CREATE MIGRATION m1dxl5urdbinmfctp46whq4g2bncsg4b6enhbnmxieo3oesjyimpna
    ONTO m1rmcuzod4awupsrdxvtbj74nmymacsykzvn27laajvg4gltjsluvq
{
  ALTER TYPE sys_user::SysUserType {
      DROP LINK resources;
  };
  DROP TYPE sys_user::SysUserTypeResource;
};
