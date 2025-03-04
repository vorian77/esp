CREATE MIGRATION m14odtmdius4yxhmy2ppnzdlwsp4fr7qlh4lb2fcm4zpmtfcaxkpcq
    ONTO m1wi4p5qa2wvtcrg7433h4hawzbu7l4hd76vz4t45x6stitbt23nva
{
                  ALTER TYPE sys_migr::SysMigr {
      CREATE PROPERTY description: std::str;
  };
};
