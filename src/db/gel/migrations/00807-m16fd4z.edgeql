CREATE MIGRATION m16fd4zsq6yznw3f5muatdq6y7nqorwrqfcyesnkqi2uf6oqmeymca
    ONTO m1o4h4agbbw533mpz2ykxv4yhav2evtcxrkgfwdsnd34t77yr23poq
{
          ALTER TYPE sys_user::SysTask {
      CREATE PROPERTY hasAltOpen: std::bool;
  };
};
