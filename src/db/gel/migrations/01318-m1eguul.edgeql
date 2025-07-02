CREATE MIGRATION m1eguul6iixzpgbymengtociplp22sjsxwxrxo2glo5kjhsmemrrpq
    ONTO m1xcoriqdzekc2bem6rvogbrcm6w2lfsnlnsoaeurzwlr6nf5vs7xa
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK codeItemChangeTriggerType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER LINK codeOp {
          RESET OPTIONALITY;
      };
  };
};
