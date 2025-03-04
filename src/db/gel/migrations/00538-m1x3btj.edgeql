CREATE MIGRATION m1x3btjwwl6zcy5jnjkcohrx63catliupforncwewzhyimdxk7fgwq
    ONTO m1ph7ff64z2z34zwphavx6gxevfoqjimfzqkol5ijpmfdoqc6boyvq
{
              ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK codeTokenAction {
          RENAME TO codePacketAction;
      };
  };
};
