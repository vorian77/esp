CREATE MIGRATION m1ay5e7dggj4246parjl5ljvpxnmc5gmr7xi57gvh2vrthloh3oyia
    ONTO m14vnep6w7mbjzbxwyr3y7rxzoqxl3khbrijhto7lgvnuhh2zxbpkq
{
              ALTER TYPE sys_core::ObjRoot {
      CREATE LINK codeObjType: sys_core::SysCode;
      CREATE LINK codeState: sys_core::SysCode;
      CREATE MULTI LINK contacts: default::SysPerson {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK testCodeMulti: sys_core::SysCode;
      CREATE LINK testCodeSingle: sys_core::SysCode;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY testBool: std::bool;
      CREATE PROPERTY testDate: cal::local_date;
      CREATE PROPERTY testDateTime: cal::local_datetime;
      CREATE PROPERTY testNumberFloat: std::float64;
      CREATE PROPERTY testNumberInt: std::int64;
      CREATE PROPERTY testText: std::str;
      CREATE PROPERTY website: std::str;
      CREATE PROPERTY zip: std::str;
  };
};
