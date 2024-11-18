CREATE MIGRATION m1qoh67l7zm3qj7ewwl5jnoo2ipcheus5iroplubajcw2xxxaksoeq
    ONTO m12fke2i4uowexykoukxzv54bhbo77vlip6l6zeoyxltmoxp7ukxsa
{
      ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK embedTable: sys_db::SysTable;
      CREATE LINK embedTableColumn: sys_db::SysColumn;
  };
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE sys_rep::SysRepElCol {
      ALTER PROPERTY header {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY name {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
