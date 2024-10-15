CREATE MIGRATION m1s26kmxoc7ukdlhv6j7gisqtnfnfv3v7nuity53v5vjv2otqiqwqa
    ONTO m1c6vpyob5g3cutsvjjnrwtrsf4hjus3uz2qajnwaqqhsjul7g3bda
{
  ALTER TYPE sys_core::SysCode {
      CREATE LINK ownerOld: sys_core::SysOrg;
  };
};
