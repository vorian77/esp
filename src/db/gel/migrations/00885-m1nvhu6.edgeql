CREATE MIGRATION m1nvhu6q5vq2czk2r6ulfumdtgoxvrajfwbybhr2xezzrr5mqn2uoa
    ONTO m16hbfpjuw6a24izslfc6wcn3arzg4mk3filpaqnlhbq7qwuffdpqq
{
  ALTER TYPE sys_core::SysCodeAction {
      CREATE LINK codeType: sys_core::SysCodeType {
          SET REQUIRED USING (<sys_core::SysCodeType>{});
      };
  };
  ALTER TYPE sys_core::SysCodeAction {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysCode LAST;
      ALTER LINK codeType {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
