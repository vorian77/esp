CREATE MIGRATION m1ftl2svwxkpeu47ytvtl2axbc2jgkv7qw7g3sdqcebqfcydhnaita
    ONTO m1gv4crsp3h75k44tquckjxynxvobcculm54fpdu4t7gzubukvvy2a
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
};
