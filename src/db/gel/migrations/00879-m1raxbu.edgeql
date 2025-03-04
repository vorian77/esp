CREATE MIGRATION m1raxbub62g4qyslco36ayka2nsdhq6mgd4vrtxsfwc3iic35ta73a
    ONTO m1m7d6lu7f5tc5nqzw7vbhqccvr4v4aa5glnuepeh5tig5xpvfgepa
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY isFormTag: std::bool;
  };
};
