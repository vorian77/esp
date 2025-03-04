CREATE MIGRATION m16ngikqxjzuifqqhi7ty2tmwlzn7udornqevpzsmafm5o4iojtbfq
    ONTO m1xclca6jqjntgr3vjfxc4ilycazl7z4bxdvhq2e6bz6n3vqm4gfxa
{
          ALTER TYPE app_cm::CmClient {
      CREATE LINK codeHighestEd: sys_core::SysCode;
      CREATE PROPERTY hasDriversLicense: std::bool;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE LINK codeRetention: sys_core::SysCode;
  };
};
