CREATE MIGRATION m1lrrdl6evzobrt65tbpdej36qhwawcjtd2vojqg6bbuuaytsv54kq
    ONTO m1kgs5msglx6gsfn6tvww6tgii2yf25g5pzjf6uuuvr7hyujzefula
{
  ALTER TYPE sys_db::SysColumn {
      DROP LINK columnLinkTable;
  };
};
