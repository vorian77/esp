CREATE MIGRATION m1juxzflogvzignugbvdcltakdpxzzu4kck7pdbv5d3mky3cmdwxta
    ONTO m1zpp56otsle3gamjxho5esirtk5ata4sobhrfjdzc3onehqs3uw7q
{
  ALTER TYPE sys_core::SysAttrAccess {
      ALTER LINK obj {
          SET MULTI;
          RESET OPTIONALITY;
      };
  };
};
