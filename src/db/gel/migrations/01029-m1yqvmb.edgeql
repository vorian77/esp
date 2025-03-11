CREATE MIGRATION m1yqvmb4adahbalor3sfoyuhtzrdqxq4pljp6ocd5eepex2r65emrq
    ONTO m13ygka4pnuccqup2qya3wxebwoots4imf6csofxfrxeeujbjnmwla
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK codeDoQueryOwnerType: sys_core::SysCode;
      CREATE LINK codeDoRenderPlatform: sys_core::SysCode;
  };
};
