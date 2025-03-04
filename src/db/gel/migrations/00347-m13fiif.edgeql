CREATE MIGRATION m13fiif6wuqpct7wsgoadrawqjx4u22f6rg6miw2pq2tuolibc4r7q
    ONTO m13qt4zhnt62i2mpeprs2noq4r7ce5voyel5ltr4y4lj3rjupierca
{
                  ALTER TYPE sys_rep::SysRepUserEl {
      ALTER LINK element {
          RESET ON SOURCE DELETE;
          RESET ON TARGET DELETE;
      };
  };
};
