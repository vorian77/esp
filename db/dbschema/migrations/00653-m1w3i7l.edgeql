CREATE MIGRATION m1w3i7low3hxfjqwoo4chrzk72azng7pv6earhdtrub22qqyq6hezq
    ONTO m1l7tpvqbjre5kok546vjrr4nnt6hxdwj2wumj3bhc5tcijiyiw4va
{
  CREATE TYPE sys_core::SysNote EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK owner: sys_core::SysSystem;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
};
