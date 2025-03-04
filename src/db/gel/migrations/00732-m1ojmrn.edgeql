CREATE MIGRATION m1ojmrnnt4pewsaz6t4scbdnwi7rvc4hotjtsn5fdazhl3zjmv2lma
    ONTO m1qeicjd3ru6nlyq26inzvcq5hzejjf5urtbqpj7wbzzhbtc6kdila
{
              DROP FUNCTION sys_user::getStaffByName(firstName: std::str, lastName: std::str);
  DROP TYPE sys_user::SysStaff;
};
