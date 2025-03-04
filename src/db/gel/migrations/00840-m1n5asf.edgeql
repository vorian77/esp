CREATE MIGRATION m1n5asf5so5msd6m4omgko5fmdg3d4lmy7iuhj2fnyc6m5epawvphq
    ONTO m1fmo6pms7r22dpfd2auxoaqdvwhhbzims4mpnj7a4pxzqgvl5xxxq
{
          ALTER TYPE sys_user::SysTask {
      CREATE LINK codeRenderType: sys_core::SysCode;
      CREATE LINK pageDataObj: sys_core::SysDataObj;
  };
};
