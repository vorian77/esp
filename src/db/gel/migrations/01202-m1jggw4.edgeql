CREATE MIGRATION m1jggw4ggpd5dndq4rioxqayd7r7iahpnw2e5o5d4uxyehi5xrv6xa
    ONTO m1bkliqp223ydtvbw5656gg2egebanvi2tcghgex63vjgugypfqt6q
{
  ALTER TYPE sys_user::SysUserActionShow {
      DROP LINK codeExprAccessType;
      DROP LINK codeExprOp;
      DROP PROPERTY exprKey;
      DROP PROPERTY exprParm;
      DROP PROPERTY exprValue;
  };
};
