CREATE MIGRATION m1azdas7z23v5ddaf3fr6tvqmi4oogoy27sw4u7u3t7z7qfb3rqboa
    ONTO m1vks2kigapvl2dyj3537gqglkyg6t2j3srt4ocqeruwponcwlpn6q
{
              ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isAlwaysRetrieveData;
      DROP PROPERTY isAlwaysRetrieveDataObject;
  };
};
