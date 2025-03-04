CREATE MIGRATION m15o6rquzlwwgtgcovxm2nul3756hxb6x5g2ocendjss7irucfwpvq
    ONTO m1i4szqktd5dpkfrzjnrgddfpgt4oju3yaub7h2vb6itidwf2md4la
{
              ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK codeTypeResource {
          RENAME TO codeType;
      };
  };
};
