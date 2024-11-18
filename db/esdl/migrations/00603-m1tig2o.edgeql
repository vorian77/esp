CREATE MIGRATION m1tig2o2jw4gy7dorza4za2nlgslc7cyqa4eil4gl6zmctjhal2o4q
    ONTO m1gvw3wzvjvc2jxefw5y35u7dkabry7kc4c5szoqualrg6ijogmr3q
{
  DROP GLOBAL sys_user::SYS_USER;
  DROP GLOBAL sys_user::SYS_USER_ID;
  ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK codeUserTypeResource {
          RENAME TO codeType;
      };
  };
  ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK userTypeResource {
          RENAME TO resource;
      };
  };
};
