CREATE MIGRATION m1sbolbgrecs5bhfsy67765drybmobzlfui5gddirbz4k5mgfhubia
    ONTO m1eid2i3mrg6gdj4fpkljwzyes22y7m4ouajrlzu2oj6252o4pea7q
{
                              ALTER TYPE sys_core::SysDataObj {
      DROP LINK listClickAction;
  };
  ALTER TYPE sys_core::SysDataObjActionField {
      CREATE PROPERTY isListEdit: std::bool;
  };
};
