CREATE MIGRATION m1zpp56otsle3gamjxho5esirtk5ata4sobhrfjdzc3onehqs3uw7q
    ONTO m1oognleblq27xuq2tytzess4o6wfjch6xbabn3zzrcfzpavvyxiba
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK codeAttrAccessSource {
          RENAME TO codeDoAttrAccessSource;
      };
  };
};
