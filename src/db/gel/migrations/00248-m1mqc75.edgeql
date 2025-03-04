CREATE MIGRATION m1mqc75zkk7c27or6435ky4fle2z5vcgpro6o3a2bqdfq2pe34vhla
    ONTO m1xyqybyffkedaxgchjhqatl24lunnntbgsnwwwl7cifcnmrirouqa
{
                              ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeNavType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER PROPERTY order {
          RESET default;
      };
  };
  ALTER TYPE sys_db::SysColumn {
      ALTER LINK codeAlignment {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
