CREATE MIGRATION m1tb3uogdnugkdjmugy2kkiex4ak4422pfqu37n6gdpiblsehkhd5a
    ONTO m124q2hdurxsgceepesctr2dec6icr4h4sarxyiy74j3ukvoduhnea
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK listOrderGroupCodeType: sys_core::SysCodeType;
      CREATE MULTI LINK listOrderGroupCodes: sys_core::SysCode;
      CREATE LINK listOrderGroupColumn: sys_db::SysColumn;
  };
};
