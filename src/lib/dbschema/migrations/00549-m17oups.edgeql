CREATE MIGRATION m17oups6azqftfsk7fwvkcvmhe3y4ehlt7m3yujn7iehp4e3wnpppa
    ONTO m1xvwjst54nk4syez47mvysn24hynetx6umfdmxczgm37qtp6uzvqa
{
  ALTER TYPE sys_core::SysOrg {
      CREATE LINK codeOrgType: sys_core::SysCode;
      CREATE PROPERTY contactEmail: std::str;
      CREATE PROPERTY contactName: std::str;
      CREATE PROPERTY contactPhone: std::str;
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY website: std::str;
  };
};
