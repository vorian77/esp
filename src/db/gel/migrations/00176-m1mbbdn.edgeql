CREATE MIGRATION m1mbbdnp6rm5jplawpzcksidxm3kel555zjnafpbf67epz3pb74vkq
    ONTO m1p3hmksvmmzcy2a3rjvuj4c4t33k27dkuadlsifyflw3j5ngg3xuq
{
                              ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK itemsTable {
          RENAME TO table;
      };
  };
};
