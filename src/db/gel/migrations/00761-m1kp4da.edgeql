CREATE MIGRATION m1kp4dalqlnpuabtcfaoabyraaixsyrgf5ess6zcjr5uwkb2owqbzq
    ONTO m1nkl3rtmeb3lmf6f6cupazgjewm26vlxcr2ytzkuporipc3l6jhua
{
          ALTER TYPE sys_user::SysUser {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::SysOrg>{});
      };
  };
};
