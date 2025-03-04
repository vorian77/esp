CREATE MIGRATION m12s2v2kmyzmpdjuqipfhtgy4fh2mjtxxjmzfy5tvsagoepzn6yk2a
    ONTO m1ftl2svwxkpeu47ytvtl2axbc2jgkv7qw7g3sdqcebqfcydhnaita
{
              ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
  ALTER TYPE sys_rep::SysRepParm {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
  ALTER TYPE sys_rep::SysRepUser {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
  ALTER TYPE sys_rep::SysRepUserEl {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
};
