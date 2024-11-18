CREATE MIGRATION m1evl3f5nrtfe7aljsaqmv7l3w2eik7drhe2eons6njnvwmgcgib4q
    ONTO m1lqkotxvolzc5qqa6u5qwfns5uhokcibe7x2jvgkxoqck3jnrvaea
{
  ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK codeType {
          RENAME TO codeTypeResource;
      };
  };
  ALTER TYPE sys_user::SysUserTypeResource {
      CREATE LINK codeTypeSubject: sys_core::SysCode;
  };
};
