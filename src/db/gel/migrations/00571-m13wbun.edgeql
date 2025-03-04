CREATE MIGRATION m13wbunawsgh2kgra2zjsmasb2qit7kp3v7f6nwwlfbgfm7fnys3fq
    ONTO m1lodjpzamkvvnkpm4u73eexp2e7hxmdbrhoro7geictvvhaiculdq
{
              ALTER TYPE app_cm::CmCohort {
      DROP LINK venue;
  };
  ALTER TYPE app_cm::CmCourse {
      DROP LINK provider;
  };
  DROP TYPE default::SysPersonTest;
  ALTER TYPE sys_rep::SysRepUser {
      DROP LINK elements;
  };
  DROP TYPE sys_rep::SysRepUserEl;
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK codeUserTypeTags: sys_core::SysCode;
  };
  ALTER TYPE sys_user::SysUserType {
      DROP LINK userTypeTags;
  };
  DROP TYPE sys_user::SysUserTypeTag;
};
