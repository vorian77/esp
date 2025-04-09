CREATE MIGRATION m1coro2ruvzwtj22z6p5mi4icj77ioqly4kcfyakxrqbhwx4vb3vdq
    ONTO m1ufzh4pspjimpxwbghmal4xiypi4jlp2j7ofak37tkqx63ztbksra
{
  CREATE TYPE sys_core::SysAttrObj EXTENDING sys_core::SysObjEnt;
  ALTER TYPE sys_core::SysAttr {
      CREATE REQUIRED LINK obj: sys_core::SysAttrObj {
          SET REQUIRED USING (<sys_core::SysAttrObj>{});
      };
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK attr;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE LINK obj: sys_core::SysAttrObj;
  };
};
