CREATE MIGRATION m1l27gz335aqkhvynochxikbya6he6lirw23aqufcyxg247fscljgq
    ONTO m1p5dq7skno56blfsydpa3gio7bhncqpt4alvd23gpiuuj7wsaxfsq
{
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER LINK codeAction {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      DROP LINK codePacketAction;
  };
};
