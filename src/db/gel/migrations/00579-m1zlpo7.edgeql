CREATE MIGRATION m1zlpo7qooqubkhj3xwndy34ga7euveai63z75tayenrdgw4aczdga
    ONTO m1pk3v4xqg3t6r676yirn4chs7zp5vrfp6y5hidwcoy24jvmfcrdla
{
              ALTER TYPE sys_core::SysObj {
      ALTER LINK owner {
          RENAME TO ownerOld;
      };
  };
};
