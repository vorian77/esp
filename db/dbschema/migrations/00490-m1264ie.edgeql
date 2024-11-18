CREATE MIGRATION m1264ie5ir6mnskiektnxshlhp7kndk7k2amvmpst6hdeu6vi3idbq
    ONTO m1nu4olent4bzlhsktocaubszewkgmpfosms7w7ivk3a47jbqhrb5q
{
  ALTER TYPE sys_rep::SysRepEl {
      ALTER LINK actionFieldGroup {
          SET REQUIRED USING (<sys_core::SysDataObjActionFieldGroup>{});
      };
  };
};
