CREATE MIGRATION m1s56vbscxjf4hcppr4aobiaj7zbnpnxck2k3qb4lhgclfk2ibh33a
    ONTO m15wzze7do5aamt56m53dsmfyzthlohes4pspbahlq3t2o3pps37lq
{
                  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isListSingleRecord;
  };
};
