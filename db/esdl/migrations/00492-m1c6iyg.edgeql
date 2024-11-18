CREATE MIGRATION m1c6iygxu42thqrugrlqgm2wojljjkyvpdafnnlqf5mhnidumnyxia
    ONTO m1dnztrnbfbnyagdffqwj24kxdizpqail524phmgklciywmxmx3fgq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK listOrderColumn {
          RENAME TO listReorderColumn;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK listOrderGroupCodeType;
      DROP LINK listOrderGroupCodes;
      DROP LINK listOrderGroupColumn;
  };
};
