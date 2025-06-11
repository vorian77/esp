CREATE MIGRATION m1wy5krqnlfuxcnixz6tiiuyvkipitcd43llm5vpfra35kgsk2mg2q
    ONTO m14hifbzpzggol6rfw2dqhejuwvyihdhx3snx2vbjoexrk65oxhzwq
{
  ALTER TYPE sys_core::SysNodeObjChild {
      CREATE LINK codeAttrType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysSystem {
      CREATE MULTI LINK codeAttrTypes: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysSystem {
      DROP LINK nodesConfigClient;
  };
  ALTER TYPE sys_core::SysSystem {
      DROP LINK nodesConfigSystem;
  };
};
