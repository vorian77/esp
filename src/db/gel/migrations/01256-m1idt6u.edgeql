CREATE MIGRATION m1idt6umzwfube3cykpul5iuvvebmoempqrpbjnhphdwngkimdtdrq
    ONTO m16zlufv6i24uuu5lbocfybqgoomfd236z6fgmeioi3lwnzuiq577a
{
  ALTER TYPE sys_user::SysUserParm DROP EXTENDING sys_user::Mgmt;
};
