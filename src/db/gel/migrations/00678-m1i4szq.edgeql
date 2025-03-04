CREATE MIGRATION m1i4szqktd5dpkfrzjnrgddfpgt4oju3yaub7h2vb6itidwf2md4la
    ONTO m1rzllsr3q4uqifmaxoky3jyl6vrp3o3lzjpmc3a4cklg54ww5i4tq
{
              ALTER TYPE sys_user::SysUserTypeResource {
      DROP LINK codeTypeSubject;
  };
};
