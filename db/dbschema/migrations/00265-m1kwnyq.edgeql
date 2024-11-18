CREATE MIGRATION m1kwnyqzayedxtga4otl6xa6hllvgjzti7peellduhtkigg5xydfra
    ONTO m1sbolbgrecs5bhfsy67765drybmobzlfui5gddirbz4k5mgfhubia
{
  ALTER TYPE sys_core::SysDataObjActionField {
      ALTER PROPERTY isListEdit {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
