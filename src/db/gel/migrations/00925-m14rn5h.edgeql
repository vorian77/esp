CREATE MIGRATION m14rn5ht4nvuw5awnd2rp7ojonine4rgntej7owuynjl6fwor5karq
    ONTO m1yxvgjbrfqfzhgfegz6rle24m7nyfyjuquj2twqw74f6vgtxankda
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER PROPERTY fieldListItemsParmName {
          RENAME TO selectParmName;
      };
  };
};
