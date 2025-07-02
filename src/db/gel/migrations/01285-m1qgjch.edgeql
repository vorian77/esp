CREATE MIGRATION m1qgjchs6nrifazuyeak2swzctrouiaxapo2yppy7gryaeznpictrq
    ONTO m1daocwwlrxlsmq5rkkyunilmnpncpvyxpi3p4fad27efnyym3zjza
{
  ALTER TYPE sys_user::SysUser {
      ALTER LINK codeAttrType {
          RESET default;
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
