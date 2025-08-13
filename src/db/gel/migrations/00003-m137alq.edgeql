CREATE MIGRATION m137alqa323dzk5iey5ar2ec4zcqaqd3zi2pg4hefaqokbadr4g5qa
    ONTO m1y3yack4xtcptinrcx46yu7stz6kwsv7rpjb3ajgymuas2szzfyma
{
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY exprClass: std::str;
  };
};
