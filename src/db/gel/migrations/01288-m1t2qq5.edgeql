CREATE MIGRATION m1t2qq5fbzoeaeqgkes3f37rr3pfolepir73po3ndqfbqymjt7wvra
    ONTO m1k3stw7ipxgfoncegdkhq2t372zn77btn3ruaay6ybgnzjf4qropq
{
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK codeAttrType {
          RESET default;
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
