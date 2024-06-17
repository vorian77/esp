CREATE MIGRATION m1eid2i3mrg6gdj4fpkljwzyes22y7m4ouajrlzu2oj6252o4pea7q
    ONTO m1uugguhxuakx4sh4ntm2oqtsxsyvuocg6ura5d47mrkyyjmsfm47q
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK listClickAction: sys_core::SysDataObjActionField;
  };
};
