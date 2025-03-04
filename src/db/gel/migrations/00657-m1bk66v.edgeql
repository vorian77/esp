CREATE MIGRATION m1bk66vhj3dbb4rrtkf5cg634prrz2nxuyvoo7p5uwh7obwtzvz7na
    ONTO m1ehnbfflzkgpk6qei2g4kqdtbtt5gz5c3376yk7rcsmrvebpq3sfa
{
              ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY userResourceSaveParmsSelect {
          RENAME TO userResourceSaveParmsSelected;
      };
  };
};
