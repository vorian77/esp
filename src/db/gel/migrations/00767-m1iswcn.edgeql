CREATE MIGRATION m1iswcnntdfzpincdcvqwoiawm5pmnzcf4vcttvmahnratn5ljov7q
    ONTO m1vsc4jpbybnytwnjpjnilj2qkkd5zt2qyqj27q7lzcfsh2qqn2ekq
{
          ALTER TYPE sys_user::SysUser {
      ALTER PROPERTY password {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
