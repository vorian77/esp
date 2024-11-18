CREATE MIGRATION m1oaqpqtryw7hpnob5ddt3wcivtryulidtyrol3d34amuhygdidmua
    ONTO m1mrs5uvp4s2azyl7bsqqhvge32ktcopd5ihtaxzyjeaoqcamdg3ta
{
  CREATE TYPE sys_core::SysDataObjFieldEmbedList EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeEditType: sys_core::SysCode;
  };
  CREATE TYPE sys_core::SysDataObjFieldEmbedListConfig EXTENDING sys_core::SysDataObjFieldEmbedList;
  CREATE TYPE sys_core::SysDataObjFieldEmbedListSelect EXTENDING sys_core::SysDataObjFieldEmbedList;
  CREATE TYPE sys_core::SysDataObjFieldEmbedListSelectExpr EXTENDING sys_core::SysDataObjFieldEmbedListSelect;
  CREATE TYPE sys_core::SysDataObjFieldEmbedListSelectUser EXTENDING sys_core::SysDataObjFieldEmbedListSelect;
};
