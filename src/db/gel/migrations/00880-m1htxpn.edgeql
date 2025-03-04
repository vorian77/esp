CREATE MIGRATION m1htxpncf4dcjhbbacrrnn4uii56kmjklokepukvy7fzfrs7yh5khq
    ONTO m1raxbub62g4qyslco36ayka2nsdhq6mgd4vrtxsfwc3iic35ta73a
{
  ALTER TYPE sys_db::SysColumn {
      DROP PROPERTY isNonData;
  };
};
