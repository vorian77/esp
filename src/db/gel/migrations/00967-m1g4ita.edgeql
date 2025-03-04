CREATE MIGRATION m1g4itaehwkmzmss5qcww2az3rh5suicqfwqi42m5llbz4cxstrfpa
    ONTO m1n544y3hbwkoaq3kbwzpwzofnswswcc5vaepzbocfht2ibfituhza
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY inputMaskAlt: std::str;
  };
};
