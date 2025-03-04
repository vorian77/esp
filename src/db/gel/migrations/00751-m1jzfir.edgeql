CREATE MIGRATION m1jzfir337uyz25ghazsjwk2qzuficdsc7wwjwdqogd4j33esqevxq
    ONTO m1mmsdfhgwzmy52y3yaqkygnh2ukkv27sj2pasdk2phjscrgpn5t4a
{
              ALTER TYPE sys_user::SysUser {
      CREATE LINK defaultOrg: sys_core::SysOrg;
  };
};
