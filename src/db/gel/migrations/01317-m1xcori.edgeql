CREATE MIGRATION m1xcoriqdzekc2bem6rvogbrcm6w2lfsnlnsoaeurzwlr6nf5vs7xa
    ONTO m1r7umr3dj7sp5jg4nk5z6jb3cx6cn7usmbribqk4pa5ib3pprgc5a
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE LINK codeItemChangeRecordStatus: sys_core::SysCode;
      CREATE LINK codeItemChangeTriggerType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      DROP LINK codeTriggerType;
  };
};
