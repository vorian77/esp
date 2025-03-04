CREATE MIGRATION m1yphq2jrxkgvlhv7d25zezxcv4em5ns6g7it4oclisuqphwpbbowa
    ONTO m1esp64unbydu6ol4af7wgtk2wdc653gibsopfcf7nct44wng56r4a
{
  ALTER TYPE sys_core::ObjRoot {
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
