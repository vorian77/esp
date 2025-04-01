CREATE MIGRATION m1f2butfwalfntabkka33hvregt4ddu7ltn6dcmonsugklafxmpkba
    ONTO m1i55wkaeo36nilm32vgyr55cd3wcojq6lwvvbbuzbyaw5evjzn4ua
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          SET REQUIRED USING (<default::SysPerson>{});
      };
  };
};
