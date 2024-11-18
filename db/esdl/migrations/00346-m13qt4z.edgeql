CREATE MIGRATION m13qt4zhnt62i2mpeprs2noq4r7ce5voyel5ltr4y4lj3rjupierca
    ONTO m14ntpqhz4bexanly3qhk6nsimrclg5gevgd4llrlaxoksfahz35da
{
      ALTER TYPE sys_rep::SysRepUserEl {
      ALTER LINK element {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
