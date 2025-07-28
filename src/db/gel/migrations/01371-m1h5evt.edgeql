CREATE MIGRATION m1h5evtu65c2yepcnfrpen3fqw6vcnia2qq66gvw6ompw54ps25zoq
    ONTO m1ake3uj7iq6hxfsuxyztvlyvisxomdchsbu5vrorjnreoy5rjvueq
{
  ALTER TYPE sys_core::SysEligibilityNodeValue DROP EXTENDING sys_user::Mgmt;
};
