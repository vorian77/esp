CREATE MIGRATION m1osprs5satohmjtgbypff3ql7zfcpspk5puft5l63764xttyddpya
    ONTO m1jggw4ggpd5dndq4rioxqayd7r7iahpnw2e5o5d4uxyehi5xrv6xa
{
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY exprWith: std::str;
  };
};
