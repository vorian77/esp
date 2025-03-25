CREATE MIGRATION m1btvjoviqyubkgk3577r5u4w3fnthetf6lkapxifnogtxztswpvnq
    ONTO m1rbcoctor2do2yoh47n5eu2oc37ys6u5lcx4ydut25w3l66ejcofa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK codeDoAttrAccessSources;
  };
};
