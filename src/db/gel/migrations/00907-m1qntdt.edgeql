CREATE MIGRATION m1qntdtoo2r7zsdlrn44psqpidit4qkrdfprfiaxtfrwpyakehzhoq
    ONTO m1quwr3liuevjm7npdf2phkiiqulazmzbajvjahvtzyxp7yzfl3vyq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isInitialValidationSilent: std::bool;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customColDetailsSummary: std::str;
  };
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY toggleValidRequiresTrue: std::bool;
  };
};
