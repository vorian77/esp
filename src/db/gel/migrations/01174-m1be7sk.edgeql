CREATE MIGRATION m1be7sk6uibqodr3hmtjyac2saxh3x3lnpnldpoarahrntewgpax3a
    ONTO m16upfg6h6yvozm4w36ox53q6pnoqzwc2efcuqbm4vxpv22jglve2a
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      CREATE LINK nodeObjDestination: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
