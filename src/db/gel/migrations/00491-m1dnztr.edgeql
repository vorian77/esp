CREATE MIGRATION m1dnztrnbfbnyagdffqwj24kxdizpqail524phmgklciywmxmx3fgq
    ONTO m1264ie5ir6mnskiektnxshlhp7kndk7k2amvmpst6hdeu6vi3idbq
{
              ALTER TYPE sys_rep::SysRep {
      CREATE REQUIRED LINK actionFieldGroup: sys_core::SysDataObjActionFieldGroup {
          SET REQUIRED USING (<sys_core::SysDataObjActionFieldGroup>{});
      };
  };
  ALTER TYPE sys_rep::SysRepEl {
      DROP LINK actionFieldGroup;
  };
};
