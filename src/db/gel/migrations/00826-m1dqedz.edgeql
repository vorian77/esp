CREATE MIGRATION m1dqedzxrtrhkyep7mc5fxvke3iumap7ofptojfheomrrjeu2ala3q
    ONTO m12zbfs4j5wp2cg4eh2x5peen2drmapbpqzuvmgdtrlxa4m7q7juqa
{
          ALTER TYPE sys_user::SysUser {
      ALTER LINK orgs {
          SET REQUIRED USING (<sys_core::SysOrg>{});
      };
      ALTER LINK systems {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
  };
};
