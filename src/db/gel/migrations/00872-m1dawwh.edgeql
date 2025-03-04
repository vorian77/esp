CREATE MIGRATION m1dawwhzjzpg6z5mncozztulwfrn5ubecolcl2len2grikpavrupna
    ONTO m1ueatbqj4npxwkgj32fbaewd6vd3z4etpafwc2klfpzitvtocdlmq
{
  ALTER TYPE sys_core::ObjRootCore {
      CREATE MULTI LINK testCodeMulti: sys_core::SysCode;
      CREATE LINK testCodeSingle: sys_core::SysCode;
      CREATE PROPERTY testBool: std::bool;
      CREATE PROPERTY testDate: cal::local_date;
      CREATE PROPERTY testDateTime: cal::local_datetime;
      CREATE PROPERTY testNumberFloat: std::float64;
      CREATE PROPERTY testNumberInt: std::int64;
      CREATE PROPERTY testText: std::str;
  };
};
