CREATE MIGRATION m1yy7ptjmz2sgnwglesrqw6khmzgjpy6tzifxlcukce2s77n2slk5a
    ONTO m1t2qq5fbzoeaeqgkes3f37rr3pfolepir73po3ndqfbqymjt7wvra
{
  ALTER TYPE sys_user::SysUserType {
      DROP EXTENDING sys_core::SysObjAttr;
      EXTENDING sys_core::SysObjOrg LAST;
  };
};
