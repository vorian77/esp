CREATE MIGRATION m1jcjdf7sma4xfbviqnwglx4a5wbhm4yrsua263ywvisav67uy5bsq
    ONTO m1b7abdzppvm5hqs7dvtbryx2sdnjh6zntuau272xovu3y5dvnhqnq
{
  ALTER TYPE sys_user::SysUserAction {
      ALTER LINK navDestination {
          RESET ON SOURCE DELETE;
      };
  };
};
