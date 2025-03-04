CREATE MIGRATION m1cqygohsban5g3tehfqttiuvy4ytbqeszq72swpzeepikyfduynka
    ONTO m1mmwac3nzy4wghykedceo6zvc2rlmm4xfv4ya7safmtr37b2eskfq
{
              ALTER TYPE sys_core::SysCode {
      CREATE LINK owner: sys_core::SysSystem;
  };
};
