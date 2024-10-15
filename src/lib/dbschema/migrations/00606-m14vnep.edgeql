CREATE MIGRATION m14vnep6w7mbjzbxwyr3y7rxzoqxl3khbrijhto7lgvnuhh2zxbpkq
    ONTO m1kzdccesxj64abvy6nhibjndsfv2b6knkhsagaay66py7othfsl3q
{
  ALTER TYPE sys_core::SysOrg {
      DROP LINK codeOrgType;
      DROP LINK codeState;
      DROP LINK contacts;
      DROP LINK testCodeMulti;
      DROP LINK testCodeSingle;
      DROP PROPERTY addr1;
      DROP PROPERTY addr2;
      DROP PROPERTY city;
      DROP PROPERTY note;
      DROP PROPERTY orderDefine;
      DROP PROPERTY testBool;
      DROP PROPERTY testDate;
      DROP PROPERTY testDateTime;
      DROP PROPERTY testNumberFloat;
      DROP PROPERTY testNumberInt;
      DROP PROPERTY testText;
      DROP PROPERTY website;
      DROP PROPERTY zip;
  };
  ALTER TYPE sys_user::SysUserTypeResource {
      CREATE PROPERTY idSubject: std::uuid;
  };
  ALTER TYPE sys_user::SysUserTypeResource {
      DROP PROPERTY isAccessible;
  };
};
