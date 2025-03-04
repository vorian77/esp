CREATE MIGRATION m1ppqo27kk5c2fm5hy6xxweuxn5twh7ez5dp2fgde24mtp3i6ga7lq
    ONTO m1duxl6z3xjczhg3sycesarevw2u3ajfw7m6qylmegvniwnotdcnwa
{
                  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY classValue {
          RENAME TO classProps;
      };
  };
};
