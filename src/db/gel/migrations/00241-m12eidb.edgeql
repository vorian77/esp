CREATE MIGRATION m12eidbd4ccylkx5rafadir5ski5mykczs4b4ea5m2tru6td3gagaa
    ONTO m1dvkifmja7t7zpl5zrlulrp7g2aqvdleaybl3ajnh3cxi4mfqel7q
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY fieldListItemsParms;
  };
};
