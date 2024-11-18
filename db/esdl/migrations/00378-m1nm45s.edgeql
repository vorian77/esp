CREATE MIGRATION m1nm45s7mkcdh7dpymqud4crapvmptpnyusrutife7rc7qtwf746bq
    ONTO m1s56vbscxjf4hcppr4aobiaj7zbnpnxck2k3qb4lhgclfk2ibh33a
{
      ALTER TYPE sys_rep::SysAnalytic {
      CREATE MULTI LINK parms: sys_rep::SysRepParm;
  };
};
