CREATE MIGRATION m1i4zpwgwc4nidj3xtrro2b7qvtx2ltkjvonusmo6eba2pi6gj5nza
    ONTO m1usvoiuxuw7ykurgeedwl26zqijn5pbpn55qvo7mrplvdrebwdx6q
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isSystemRootNode;
  };
};
