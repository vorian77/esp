CREATE MIGRATION m1kndmsevd6mvufvhrzhuxiqm4mhm24q5hlpo3ctpvviglsw4xsw7a
    ONTO m1bwgnwgsf6krr73wx35ngbvecnehtfmpxmxjppxr4zf7x4ubf7vrq
{
  ALTER TYPE sys_core::SysObjDb {
      ALTER PROPERTY exprFilterCurrentRecords {
          RENAME TO exprFilterExcept;
      };
  };
};
