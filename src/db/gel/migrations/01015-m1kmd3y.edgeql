CREATE MIGRATION m1kmd3ytl5xcyu5zzeyz5bokqfgpinpgmpmopbbv3iltfsiljvf3jq
    ONTO m1ftcepldbmlairqhaqjq65fwsvmtij6rk3lwbvtvjsabwwtuubqqa
{
  ALTER TYPE sys_core::SysObjEnt {
      CREATE PROPERTY phoneOffice: std::str;
  };
};
