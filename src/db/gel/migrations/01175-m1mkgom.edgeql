CREATE MIGRATION m1mkgommxspjvdkmjwga52jnscy5rrmtbax342dq4u6cbus7rdbprq
    ONTO m1be7sk6uibqodr3hmtjyac2saxh3x3lnpnldpoarahrntewgpax3a
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER LINK nodeObjDestination {
          RENAME TO nodeUserDestination;
      };
  };
};
