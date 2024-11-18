CREATE MIGRATION m1s4nr2j3vxxyqgjuh2z5z3jff2fr3vccpyjzaqswfw5njzhfxfy4q
    ONTO m1olezvgpatzc3d2mi7ajmwj2pztrthe23kwdwbl5whhtfobeewpmq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY fieldListItemsParmName: std::str;
  };
};
