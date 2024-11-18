CREATE MIGRATION m15wzze7do5aamt56m53dsmfyzthlohes4pspbahlq3t2o3pps37lq
    ONTO m1lzojnv4sztaqiyszjkekn6mfg3x63duycilcnyt46f6ruf3xvq7a
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customColType {
          RENAME TO customColCodeType;
      };
  };
};
