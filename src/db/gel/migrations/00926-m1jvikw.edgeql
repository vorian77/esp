CREATE MIGRATION m1jvikw55cwakmlvgmguvx2q4p7f5fe7sbpmi6be4ksqvmhmdzh4va
    ONTO m14rn5ht4nvuw5awnd2rp7ojonine4rgntej7owuynjl6fwor5karq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY fieldListItemsParmName {
          RENAME TO fieldListItemsParmValue;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER PROPERTY selectParmName {
          RENAME TO selectParmValue;
      };
  };
  ALTER TYPE sys_rep::SysRepParm {
      ALTER PROPERTY fieldListItemsParmName {
          RENAME TO fieldListItemsParmValue;
      };
  };
};
