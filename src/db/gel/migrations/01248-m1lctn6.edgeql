CREATE MIGRATION m1lctn6tz7o6dnmcg3hbibq4i2x4wbobu4qwn4vgw2b6aqh7q556tq
    ONTO m1oc2wwfpulejscsbpv726ofrj5osemnf5jw3e2qhqfpj7ntlog25a
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK selectListItems;
      DROP PROPERTY selectListItemsHeader;
      DROP PROPERTY selectListItemsParmValue;
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE LINK selectListItems: sys_core::SysDataObjFieldListItems;
      CREATE PROPERTY selectListItemsHeader: std::str;
      CREATE PROPERTY selectListItemsParmValue: std::str;
  };
};
