CREATE MIGRATION m1l7uip2j3rmmmzloqyxqiv4cf7f2rr4u2ivbglrkw4yf6su7gaita
    ONTO m15zbsmeeurxknocxz4o7vglqzhxw4hpxsupwi2mdkoichvjli2iuq
{
              ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK user: sys_user::SysUser;
  };
  ALTER TYPE org_moed::MoedParticipant {
      DROP LINK user;
  };
};
