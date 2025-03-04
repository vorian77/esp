CREATE MIGRATION m1ueatbqj4npxwkgj32fbaewd6vd3z4etpafwc2klfpzitvtocdlmq
    ONTO m1f5soqf3cejbutwc2djndvobuezh4rajtp3b5xuye55m3t7jnuera
{
  ALTER TYPE sys_core::ObjRoot {
      DROP LINK testCodeMulti;
      DROP LINK testCodeSingle;
      DROP PROPERTY testBool;
      DROP PROPERTY testDate;
      DROP PROPERTY testDateTime;
      DROP PROPERTY testNumberFloat;
      DROP PROPERTY testNumberInt;
      DROP PROPERTY testText;
  };
  ALTER TYPE sys_user::SysUser {
      DROP LINK personOld;
  };
};
