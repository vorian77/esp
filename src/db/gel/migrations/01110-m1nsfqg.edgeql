CREATE MIGRATION m1nsfqg5qz66fiaxe3zcoymm6pqrpgkie35ubhqffmxgtcp2ns5hiq
    ONTO m1gmeh5x7nresulk2texo6bkouw2bww5nfrl55gefklf2zr42vxxva
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK parentColumnOld;
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK parentTableOld;
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK queryRiders {
          RENAME TO queryRidersOld;
      };
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY listEditPresetExprOld;
      DROP PROPERTY parentFilterExprOld;
  };
};
