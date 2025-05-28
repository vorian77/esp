CREATE MIGRATION m13yy2mczjw3665obiz3h6n7gk2icpe6psxkckq5f5pjquqdzthyja
    ONTO m1jcjdf7sma4xfbviqnwglx4a5wbhm4yrsua263ywvisav67uy5bsq
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      DROP LINK codeDestinationType;
      DROP LINK nodeDestination;
  };
  ALTER TYPE sys_user::SysUserAction {
      DROP LINK codeDestinationType;
      DROP LINK nodeDestination;
  };
};
