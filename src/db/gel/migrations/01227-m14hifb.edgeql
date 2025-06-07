CREATE MIGRATION m14hifbzpzggol6rfw2dqhejuwvyihdhx3snx2vbjoexrk65oxhzwq
    ONTO m1ztrajyf62j75rd6ampf4tmcfgaterdf37dip5n3ssqqnudmglrjq
{
  ALTER TYPE sys_core::SysSystem {
      CREATE MULTI LINK nodesConfigClient: sys_core::SysNodeObj {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK nodesConfigSystem: sys_core::SysNodeObj {
          ON TARGET DELETE ALLOW;
      };
  };
};
