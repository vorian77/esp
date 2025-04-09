CREATE MIGRATION m1nrxxibywgaw3rnpboujwxvb4eeiwg3apcsyxv52yxarpmxhyvm3q
    ONTO m164inbbkpstzcuxwfmvnht7cdvxruperoz6cov2klbnwq3omzsdnq
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK parent {
          ON SOURCE DELETE DELETE TARGET;
          RESET ON TARGET DELETE;
      };
  };
};
