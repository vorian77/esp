CREATE MIGRATION m1oognleblq27xuq2tytzess4o6wfjch6xbabn3zzrcfzpavvyxiba
    ONTO m1e6rariwj3sbazyprjt6usgq22542tc62jx2ljrrbkd4dbieehe4q
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK codeAttrAccessSource: sys_core::SysCode;
  };
};
