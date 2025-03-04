CREATE MIGRATION m1v57zpjqdulaoa2pqzy2wkmniszx6mms3iekh2q7i6t4ueh2v5wvq
    ONTO m1qoh67l7zm3qj7ewwl5jnoo2ipcheus5iroplubajcw2xxxaksoeq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK embedTable;
      DROP LINK embedTableColumn;
  };
};
